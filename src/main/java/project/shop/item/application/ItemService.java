package project.shop.item.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.shop.item.domain.command.CreateItemCommand;
import project.shop.item.domain.command.CreateItemImageCommand;
import project.shop.item.domain.command.CreateItemOptionGroupCommand;
import project.shop.item.domain.command.CreateItemSalePolicyCommand;
import project.shop.item.domain.entity.Category;
import project.shop.item.domain.entity.Item;
import project.shop.item.domain.entity.ItemSalePolicy;
import project.shop.item.domain.enums.Status;
import project.shop.item.infrastructure.persistence.CategoryRepository;
import project.shop.item.infrastructure.persistence.ItemRepository;
import project.shop.item.infrastructure.persistence.ItemSalePolicyRepository;
import project.shop.item.presentation.admin.v1.response.ItemListResponse;
import project.shop.item.presentation.user.v1.response.ItemCardResponse;
import project.shop.item.presentation.user.v1.response.ItemDetailResponse;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemSalePolicyRepository itemSalePolicyRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public void saveItem(CreateItemCommand itemCommand,
                         List<CreateItemOptionGroupCommand> groupCommands,
                         CreateItemSalePolicyCommand policyCommand,
                         List<CreateItemImageCommand> imageCommands) {

        Item.validateGroupOptions(groupCommands);

        Item item = Item.create(itemCommand);
        itemRepository.save(item);

        item.addOptionGroups(groupCommands);
        item.addImages(imageCommands);

        ItemSalePolicy policy = ItemSalePolicy.create(item, policyCommand);
        itemSalePolicyRepository.save(policy);
    }

    public Page<ItemListResponse> getItems(String itemName, Status status, Pageable pageable) {
        Page<Item> items = itemRepository.findItems(itemName, status, pageable);
        Map<Integer, String> categoryNames = fetchCategoryNames(items.getContent());
        return items.map(item -> ItemListResponse.from(item, categoryNames.get(item.getCategoryId())));
    }

    public Page<ItemCardResponse> getActiveItems(String categoryName, Pageable pageable) {
        Integer categoryId = resolveCategoryId(categoryName);
        if (categoryName != null && !categoryName.isBlank() && categoryId == null) {
            return Page.empty(pageable);
        }

        Page<Item> items = itemRepository.findActiveItems(categoryId, pageable);
        Map<Integer, String> categoryNames = fetchCategoryNames(items.getContent());
        return items.map(item -> ItemCardResponse.from(item, categoryNames.get(item.getCategoryId())));
    }

    public ItemDetailResponse getItemDetail(Long itemId) {
        Item item = itemRepository.findActiveItemById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

        String categoryName = categoryRepository.findById(item.getCategoryId())
                .map(Category::getCategoryName)
                .orElse(null);

        return ItemDetailResponse.from(item, categoryName);
    }

    private Integer resolveCategoryId(String categoryName) {
        if (categoryName == null || categoryName.isBlank()) return null;
        return categoryRepository.findByCategoryName(categoryName)
                .map(c -> c.getCategoryId())
                .orElse(null);
    }

    private Map<Integer, String> fetchCategoryNames(List<Item> items) {
        Set<Integer> categoryIds = items.stream()
                .map(Item::getCategoryId)
                .collect(Collectors.toSet());
        return categoryRepository.findAllById(categoryIds).stream()
                .collect(Collectors.toMap(Category::getCategoryId, Category::getCategoryName));
    }
}
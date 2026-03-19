package project.shop.item.presentation.admin.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import project.shop.item.application.ItemService;
import project.shop.item.domain.command.CreateItemCommand;
import project.shop.item.domain.command.CreateItemImageCommand;
import project.shop.item.domain.command.CreateItemOptionGroupCommand;
import project.shop.item.domain.command.CreateItemOptionGroupValueCommand;
import project.shop.item.domain.command.CreateItemSalePolicyCommand;
import project.shop.item.domain.enums.Status;
import project.shop.item.presentation.admin.v1.request.SaveItem;
import project.shop.item.presentation.admin.v1.response.ItemListResponse;

import java.util.List;

@RestController("AdminItemController")
@RequestMapping("/admin/v1/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /**
     * 어드민 상품 목록 조회 (삭제된 상품 제외)
     */
    @GetMapping
    public Page<ItemListResponse> getItems(
            @RequestParam(required = false) String itemName,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 20, sort = "itemId") Pageable pageable
    ) {
        return itemService.getItems(itemName, status, pageable);
    }

    /**
     * 어드민 상품 등록
     */
    @PostMapping
    public void saveItem(@RequestBody SaveItem request) {
        CreateItemCommand itemCommand = new CreateItemCommand(
                request.categoryId(),
                request.itemName(),
                request.description(),
                request.price(),
                request.status()
        );

        List<CreateItemOptionGroupCommand> groupCommands = request.groups().stream()
                .map(group -> new CreateItemOptionGroupCommand(
                        group.groupName(),
                        group.sortOrder(),
                        group.values().stream()
                                .map(value -> new CreateItemOptionGroupValueCommand(
                                        value.valueName(),
                                        value.additionalPrice(),
                                        value.sortOrder()
                                ))
                                .toList()
                ))
                .toList();

        CreateItemSalePolicyCommand policyCommand = new CreateItemSalePolicyCommand(
                request.policyType(),
                request.price(),
                request.salePrice(),
                request.saleStartAt(),
                request.saleEndAt()
        );

        List<CreateItemImageCommand> imageCommands = request.images() == null
                ? List.of()
                : request.images().stream()
                        .map(img -> new CreateItemImageCommand(
                                img.fileUrl(),
                                img.originalName(),
                                img.imageType(),
                                img.sortOrder()
                        ))
                        .toList();

        itemService.saveItem(itemCommand, groupCommands, policyCommand, imageCommands);
    }
}

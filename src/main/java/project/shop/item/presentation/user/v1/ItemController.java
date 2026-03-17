package project.shop.item.presentation.user.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import project.shop.item.application.ItemService;
import project.shop.item.presentation.user.v1.response.ItemCardResponse;
import project.shop.item.presentation.user.v1.response.ItemDetailResponse;

@RestController("UserItemController")
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /**
     * 상품 목록 조회 (상품 이름으로 검색 가능)
     */
    @GetMapping
    public Page<ItemCardResponse> getItems(
            @RequestParam(required = false) String categoryName,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return itemService.getActiveItems(categoryName, pageable);
    }

    /**
     * 상품 상세 조회
     */
    @GetMapping(value = "/{itemId}")
    public ItemDetailResponse getItem(@PathVariable Long itemId) {
        return itemService.getItemDetail(itemId);
    }
}
package project.shop.domain.item.controller.admin.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.shop.domain.item.ItemService;
import project.shop.domain.item.controller.admin.v1.request.SaveItem;

@RestController("AdminItemController")
@RequestMapping("/admin/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public void saveItem(@RequestBody SaveItem request) {
        itemService.saveItem(request);
    }
}

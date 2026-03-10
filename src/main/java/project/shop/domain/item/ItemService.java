package project.shop.domain.item;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.shop.domain.item.controller.admin.v1.request.SaveItem;

@Service
@RequiredArgsConstructor
public class ItemService {

    /**
     * TB_ITEM
     * TB_ITEM_OPTION_GROUP
     * TB_ITEM_OPTION_VALUE
     * TB_ITEM_SALE_POLICY
     *
     * TB_ITEM_SKU <- 이거는 이번 API에서 저장하지 않음
     * TB_ITEM_SKU <- 이거는 이번 API에서 저장하지 않음
     */
    @Transactional
    public void saveItem(SaveItem request) {
        // validation

    }
}

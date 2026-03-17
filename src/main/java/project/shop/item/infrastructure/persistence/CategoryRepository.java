package project.shop.item.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import project.shop.item.domain.entity.Category;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByCategoryName(String categoryName);
}
package com.praksa.auction.service;

import com.atlascopco.hunspell.Hunspell;
import com.praksa.auction.config.HunspellConfiguration;
import com.praksa.auction.dto.NewProductDto;
import com.praksa.auction.dto.SortDto;
import com.praksa.auction.model.Picture;
import com.praksa.auction.model.Product;
import com.praksa.auction.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final HunspellConfiguration hunspellConfiguration;
    private static final int MIN_WORD_LENGTH = 3;
    @Autowired
    private SubcategoryService subcategoryService;
    @Lazy
    @Autowired
    private PersonService personService;
    @Autowired
    private PictureService pictureService;

    @Autowired
    public ProductService(ProductRepository procuctRepository, HunspellConfiguration config) {
        this.productRepository = procuctRepository;
        this.hunspellConfiguration = config;
    }

    public Optional<Product> getSelectedProduct(long id) {
        return productRepository.findById(id);
    }

    public Product getRandomProduct() {
        return productRepository.selectRandom(PageRequest.of(0, 1)).get(0);
    }

    public List<Product> getLastChance(int start, int count) {
        List<Product> products = productRepository.findProductsByEndingDateAfterOrderByEndingDateAsc(new Date(), PageRequest.of(start, count));
        return products;
    }

    public List<Product> getNewest(int start, int count) {
        List<Product> products = productRepository.findProductsByEndingDateAfterOrderByStartingDateDesc(new Date(), PageRequest.of(start, count));
        return products;
    }

    public List<Product> getProductsFromCategory(String category, int count,SortDto sorting) {
        Sort.Order order = new Sort.Order(Sort.Direction.valueOf(sorting.getDirection().toString()), sorting.getField());
        return productRepository.getProductsFromCategory(category, PageRequest.of(0, count,Sort.by(order)));
    }

    public List<Product> searchProducts(String search, int count,SortDto sorting) {
        Sort.Order order = new Sort.Order(Sort.Direction.valueOf(sorting.getDirection().toString()), sorting.getField());
        return productRepository.searchProducts(search, PageRequest.of(0, count,Sort.by(order)));
    }

    public List<Product> getAllActiveProducts(int count, SortDto sorting) {
        Sort.Order order = new Sort.Order(Sort.Direction.valueOf(sorting.getDirection().toString()), sorting.getField());
        return productRepository.findProductsByEndingDateAfter(PageRequest.of(0, count,Sort.by(order)));
    }

    public String getSearchSuggestion(String search) {
        Hunspell speller = hunspellConfiguration.speller();
        List<String> suggestons = speller.suggest(search);
        for (String suggest : suggestons) {
            if (suggest.length() < MIN_WORD_LENGTH) continue;
            List<Product> searchResult = productRepository.searchProducts(suggest, PageRequest.of(0, 9));
            if (searchResult.size() != 0) return suggest;
        }
        return "";
    }

    public void updatePayedStatus(boolean payed, long product) {
        productRepository.updatePayedStatus(payed, product);
    }

    public boolean existBySeller(long sellerId) {
        return productRepository.existsProductByPersonId(sellerId);
    }

    public Product addNewProduct(NewProductDto productDto) {
        Product newProduct = productRepository.save(new Product(productDto, subcategoryService.getSubcategoryById(productDto.getSubcategoryId()), personService.getPersonById(productDto.getPersonId())));
        List<Picture> pictures = new ArrayList<>();
        for (String picture : productDto.getPictures()) {
            pictures.add(new Picture(picture, newProduct));
        }
        pictureService.addNewPictures(pictures);
        return newProduct;
    }

    public void updateEndDate(Date date, long productId) {
        productRepository.updateEndDate(date, productId);
    }
}

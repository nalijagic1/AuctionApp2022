package com.praksa.auction.controller;

import com.praksa.auction.model.Picture;
import com.praksa.auction.model.Product;
import com.praksa.auction.service.CategoryService;
import com.praksa.auction.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class PictureController {
    private final PictureService pictureService;

    @Autowired
    public PictureController(PictureService pictureService) {
        this.pictureService = pictureService;
    }

    @GetMapping("/pictures/{id}")
    public ResponseEntity<List<Picture>> getProductImages(@PathVariable("id") int id) {
        return ResponseEntity.ok(pictureService.getProductPictures((long) id));
    }

}

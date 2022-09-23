package com.praksa.auction.controller;

import com.praksa.auction.model.Picture;
import com.praksa.auction.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pictures")
public class PictureController {
    private final PictureService pictureService;

    @Autowired
    public PictureController(PictureService pictureService) {
        this.pictureService = pictureService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Picture>> getProductPictures(@PathVariable long id) {
        return ResponseEntity.ok(pictureService.getProductPictures(id));
    }

    @GetMapping("/cover/{id}")
    public ResponseEntity<Picture> getCoverImage(@PathVariable long id) {
        return ResponseEntity.ok(pictureService.getCoverImage(id));
    }
}

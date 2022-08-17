package com.praksa.auction.service;

import com.praksa.auction.model.Picture;
import com.praksa.auction.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PictureService {
    private final PictureRepository pictureRepository;

    @Autowired
    public PictureService(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    public List<Picture> getProductPictures(Long id) {
        return pictureRepository.findPicturesByProductId(id);
    }

    public Picture getCoverImage(Long id) {
        return pictureRepository.findFirstByProductId(id);
    }
}

package com.praksa.auction.repository;

import com.praksa.auction.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> findPicturesByProductId(Long id);
}

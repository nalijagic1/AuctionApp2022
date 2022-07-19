package com.praksa.auction.config;

import com.atlascopco.hunspell.Hunspell;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HunspellConfiguration {

    @Bean
    public Hunspell speller() {
        String dicPath = "src/main/resources/dictionary/en_US.dic";
        String affPath = "src/main/resources/dictionary/en_US.aff";
        return new Hunspell(dicPath, affPath);
    }
}
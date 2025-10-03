package com.codegym.controller;

import com.codegym.model.Smartphone;
import com.codegym.service.impl.SmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*") // cho phép mọi URL đều có thể truy cập đến tài nguyên thông qua API
@RequestMapping("/api/smartphones")
public class SmartphoneController {
    @Autowired
    private SmartphoneService smartphoneService;

    @GetMapping
    public ResponseEntity<Iterable<Smartphone>> listSmartphones() {
        return new ResponseEntity<>(smartphoneService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Smartphone> createSmartphone(@RequestBody Smartphone smartphone) {
        return new ResponseEntity<>(smartphoneService.save(smartphone), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Smartphone> deleteSmartphone(@PathVariable Long id) {
        Optional<Smartphone> smartphoneOptional = smartphoneService.findById(id);
        if (!smartphoneOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        smartphoneService.remove(id);
        return new ResponseEntity<>(smartphoneOptional.get(), HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Smartphone> updateSmartphone(@PathVariable Long id, @RequestBody Smartphone smartphone) {
        Optional<Smartphone> smartphoneOptional = smartphoneService.findById(id);
        if (!smartphoneOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Smartphone existingSmartphone = smartphoneOptional.get();
        existingSmartphone.setProducer(smartphone.getProducer());
        existingSmartphone.setModel(smartphone.getModel());
        existingSmartphone.setPrice(smartphone.getPrice());
        Smartphone updatedSmartphone = smartphoneService.save(existingSmartphone);
        return new ResponseEntity<>(updatedSmartphone, HttpStatus.OK);
    }


}

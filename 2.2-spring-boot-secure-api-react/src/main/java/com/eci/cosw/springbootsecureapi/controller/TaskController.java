/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

/**
 *
 * @author AndrésQuintero
 */
@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    ObjectMapper mapperJson;

    @GetMapping(value= "/task")
    public ResponseEntity<?> getTasks() {
        String tasks = null;
        try {
            tasks = Unirest.get("https://taskplanners.azurewebsites.net/api/add-task?code=NWSnen0J4ChNFX2V00AR6LAvFRNd/WJAiOBTSEM3ZrsBUB6k8Ar73Q==")
                    .asString().getBody();
        } catch (UnirestException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping(value= "/newtask")
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        try {
            Unirest.post("https://taskplanners.azurewebsites.net/api/add-task?code=NWSnen0J4ChNFX2V00AR6LAvFRNd/WJAiOBTSEM3ZrsBUB6k8Ar73Q==")
                    .header("Content-Type", "application/json")
                    .body(mapperJson.writeValueAsString(task)).asString().getStatus();
        } catch (UnirestException | JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}

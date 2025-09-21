package todo_demo.example.todo_demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import todo_demo.example.todo_demo.dto.TodoDto;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TodoController {
    
    @GetMapping("/")
    public String index() {
        return "index";
    }
    
    @GetMapping("/api/todos")
    @ResponseBody
    public List<TodoDto> getTodos() {
        // This endpoint is optional and can be used for debugging
        // In a real application, todos are stored in LocalStorage
        return new ArrayList<>();
    }
}
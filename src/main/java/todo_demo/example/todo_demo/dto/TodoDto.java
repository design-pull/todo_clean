package todo_demo.example.todo_demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    private String id;
    private String title;
    private boolean completed;
    private String createdDate;
}
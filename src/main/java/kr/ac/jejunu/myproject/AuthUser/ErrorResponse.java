package kr.ac.jejunu.myproject.AuthUser;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class ErrorResponse {
    // HttpStatus
    private int status;

    // Http Default Message
    private String message;


    public ErrorResponse(Code code){
        this.status = code.getCode();
        this.message = code.getMessage();
    }
}

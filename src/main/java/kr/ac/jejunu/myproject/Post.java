package kr.ac.jejunu.myproject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class) // entity 저장되는 일시를 저장
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 불필요한 기본 생성자를 만들지 않는다.
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String contentTitle;
    @CreatedDate // 등록된 일시 자동 저장
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime modifiedDate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"posts"})
    private Member member;
    @Version // 수정하면 버전이 바뀜
    private Long version;
    String thumbnail;

    public Post(String content, String contentTitle) {
        this.content = content;
        this.contentTitle = contentTitle;
    }

    public void setThumbnail(String url) {
        this.thumbnail = url;
    }
}
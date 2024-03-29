package kr.ac.jejunu.myproject.AuthUser;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Data
@Entity
@Table(name = "T_USER")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails { //UserDetails는 시큐리티가 관리하는 객체이다.
    enum Admin {
        TRUE, FALSE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sequence_id")
    private Long userSequenceId;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String userEmail;

    @Column(name = "birth", length = 6)
    private String userBirth;

    @Column(name = "nickname", length = 15)
    private String userNickname;

    @Column(name = "ADMIN", length = 4)
    @Enumerated(EnumType.STRING)
    private Admin admin;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
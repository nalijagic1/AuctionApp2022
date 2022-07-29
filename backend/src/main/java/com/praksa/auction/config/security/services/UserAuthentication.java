package com.praksa.auction.config.security.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserAuthentication extends UsernamePasswordAuthenticationFilter {
    public UserAuthentication() {
        super.setUsernameParameter("email");
        super.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/auth/people/login","POST"));
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String mail = request.getParameter("email");
        return super.attemptAuthentication(request, response);
    }
}

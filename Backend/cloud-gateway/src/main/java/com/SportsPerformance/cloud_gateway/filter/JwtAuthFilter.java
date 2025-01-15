package com.SportsPerformance.cloud_gateway.filter;
import com.SportsPerformance.cloud_gateway.exception.CustomExceptions;
import com.SportsPerformance.cloud_gateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtAuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())){
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                    throw new CustomExceptions.UnauthorizedAccessException("missing authorization header");
                }

                String authHeader =exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader!=null && authHeader.startsWith("Bearer ")){
                    authHeader = authHeader.substring(7);
                }
                try{
                    jwtUtil.validateToken(authHeader);
                }catch (Exception e){
                    throw new CustomExceptions.UnauthorizedAccessException("Unauthorized access: Invalid token");
                }
                String role = jwtUtil.extractRole(authHeader);
                if (exchange.getRequest().getURI().getPath().endsWith("/admin") && !role.equals("ADMIN")){
                    throw new CustomExceptions.UnauthorizedAccessException("Access to this is restricted");
                }
                if (exchange.getRequest().getURI().getPath().endsWith("/coach") && role.equals("ATHLETE")){
                    throw new CustomExceptions.UnauthorizedAccessException("Access to this is restricted");
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config{

    }

}

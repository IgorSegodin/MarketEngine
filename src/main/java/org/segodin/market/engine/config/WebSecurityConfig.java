package org.segodin.market.engine.config;

//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig/* extends WebSecurityConfigurerAdapter*/ {

//    @Autowired
//    private UserService userService;
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(userService);
//        provider.setPasswordEncoder(new StandardPasswordEncoder());
//        http
//                .authenticationProvider(provider)
//                .authorizeRequests()
//                    .antMatchers("/login").anonymous()
//                    .antMatchers("/js/**").permitAll()
//                    .antMatchers("/**").authenticated()
//                    .and()
//                .formLogin()
//                    .loginPage("/login")
//                    .loginProcessingUrl("/process-login")
//                    .failureUrl("/login?error")
//                    .passwordParameter("password")
//                    .usernameParameter("email")
//                    .defaultSuccessUrl("/")
//                    .and()
//                .csrf()
//                    .disable()
//                    .httpBasic()
//                    .and()
//                .logout()
//                    .logoutUrl("/logout")
//                    .deleteCookies("JSESSIONID")
//                    .invalidateHttpSession(true)
//                    .and()
//                .exceptionHandling()
//                    .accessDeniedPage("/403");
//    }

}

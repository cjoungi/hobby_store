package kr.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;


@Configuration
@EnableAsync
public class AsyncConfig {

	@Bean(name = "executor")
    public ThreadPoolTaskExecutor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3); // 기본 스레드 수
        executor.setMaxPoolSize(5); // 최대 스레드 수
        executor.setQueueCapacity(10); // 큐 사이즈
        executor.setThreadNamePrefix("async-thread-");
        executor.initialize();
        return executor;
    }
}
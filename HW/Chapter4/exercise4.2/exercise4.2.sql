CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(16) NOT NULL,
    `user_pw` VARCHAR(16) NOT NULL,
    `nickname` VARCHAR(50) NOT NULL,
    `profile_img_link` VARCHAR(80) NOT NULL,
    `profile_msg` VARCHAR(80) NOT NULL,
    `withdrawal` TINYINT(1) NOT NULL DEFAULT 0,
    `register_date` DATE NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `channels` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `user_create` INT NOT NULL,
    `channel_link` VARCHAR(80) NOT NULL,
    `max_capacity` INT NOT NULL,
    `withdrawal` TINYINT(1) NOT NULL DEFAULT 0,
    `create_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_create`)
    REFERENCES `users`(`id`) on DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chats` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `comment` TEXT NOT NULL,
    `commentor` INT NOT NULL,
    `comment_channel` INT NOT NULL,
    `comment_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`commentor`)
    REFERENCES `users`(`id`) on DELETE CASCADE,
    FOREIGN KEY (`comment_channel`)
    REFERENCES `channels`(`id`) on DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `follows` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `follower` INT NOT NULL,
    `followee` INT NOT NULL,
    `follow_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`follower`)
    REFERENCES `users`(`id`) on DELETE CASCADE,
    FOREIGN KEY (`followee`)
    REFERENCES `users`(`id`) on DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `blocks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `blocker` INT NOT NULL,
    `blocked` INT NOT NULL,
    `block_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`blocker`)
    REFERENCES `users`(`id`) on DELETE CASCADE,
    FOREIGN KEY (`blocked`)
    REFERENCES `users`(`id`) on DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
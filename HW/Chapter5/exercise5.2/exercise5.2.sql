SELECT `users`.`id`, `users`.`name`, `seat_number` FROM `tickets`
    INNER JOIN `users` on `tickets`.`user` = `users`.`id`
    INNER JOIN `trains` on `tickets`.`train` = `trains`.`id` AND `trains`.`id` = 11
    ORDER BY `seat_number` ASC;

SELECT `users`.`id`, `name`, Count(`train`) AS `trains_count`,
    Sum(distance) AS `total_distance` FROM `tickets`
    INNER JOIN `users` on `tickets`.`user` = `users`.`id`
    INNER JOIN `trains` on `tickets`.`train` = `trains`.`id`
    GROUP BY `users`.`id` ORDER BY `total_distance` DESC, `users`.`id` LIMIT 6;

SELECT `trains`.`id`, `types`.`name` AS `type`, 
    `s1`.`name` AS `src_stn`, `s2`.`name` AS `dst_stn`,
    Timediff(`arrival`, `departure`) AS `travel_time` FROM `trains`
    INNER JOIN `types` on `trains`.`type` = `types`.`id`
    INNER JOIN `stations` AS `s1` on `trains`.`source` = `s1`.`id`
    INNER JOIN `stations` AS `s2` on `trains`.`destination` = `s2`.`id`
    ORDER BY `travel_time` DESC LIMIT 6;

SELECT `types`.`name` AS `type`, 
    `s1`.`name` AS `src_stn`, `s2`.`name` AS `dst_stn`, 
    `departure`, `arrival`, 
    Round((`fare_rate` / 100) * (`distance` / 10), -2) AS `fare` FROM `trains`
    INNER JOIN `types` on `trains`.`type` = `types`.`id`
    INNER JOIN `stations` AS `s1` on `trains`.`source` = `s1`.`id`
    INNER JOIN `stations` AS `s2` on `trains`.`destination` = `s2`.`id`
    ORDER BY `departure`;

SELECT `trains`.`id`, `types`.`name`, `s1`.`name` AS `scr_stn`, 
    `s2`.`name` AS `dst_stn`, Count(`user`) AS `occupied`, 
    `max_seats` AS `maximum` FROM `tickets`
    INNER JOIN `trains` on `tickets`.`train` = `trains`.`id`
    INNER JOIN `stations` AS `s1` on `trains`.`source` = `s1`.`id`
    INNER JOIN `stations` AS `s2` on `trains`.`destination` = `s2`.`id`
    INNER JOIN `types` on `trains`.`type` = `types`.`id`
    GROUP BY `trains`.`id` ORDER BY `trains`.`id`;

SELECT `trains`.`id`, `types`.`name`, `s1`.`name` AS `scr_stn`, 
    `s2`.`name` AS `dst_stn`, Count(`user`) AS `occupied`, 
    `max_seats` AS `maximum` FROM `tickets`
    RIGHT OUTER JOIN `trains` on `tickets`.`train` = `trains`.`id`
    RIGHT OUTER JOIN `stations` AS `s1` on `trains`.`source` = `s1`.`id`
    RIGHT OUTER JOIN `stations` AS `s2` on `trains`.`destination` = `s2`.`id`
    RIGHT OUTER JOIN `types` on `trains`.`type` = `types`.`id`
    GROUP BY `trains`.`id` ORDER BY `trains`.`id`;    

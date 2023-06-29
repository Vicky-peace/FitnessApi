-- Users Table
CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isAdmin BIT 
);

-- Trainers Table
CREATE TABLE Trainers (
    trainer_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    trainer_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
);

-- Plans Table
CREATE TABLE Plans (
    plan_id INT PRIMARY KEY NOT NULL,
    plan_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
);

-- Subscriptions Table
CREATE TABLE Subscriptions (
    subscription_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    user_id INT FOREIGN KEY REFERENCES Users(user_id) NOT NULL,
    plan_id INT FOREIGN KEY REFERENCES Plans(plan_id) NOT NULL,
    subscription_date DATE NOT NULL,
);

-- Classes Table
CREATE TABLE Classes (
    class_id INT PRIMARY KEY NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    trainer_id INT FOREIGN KEY REFERENCES Trainers(trainer_id) NOT NULL,
);
 
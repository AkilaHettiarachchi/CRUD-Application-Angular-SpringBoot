package com.project.backend.service;

import com.project.backend.model.User;
import com.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getUser() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User getUserByid(int id) {
        return userRepository.findById(id).get();
    }

    @Override
    public User updateUser(int id, User user) {
        User user1 = userRepository.findById(id).get();
        user1.setId(user.getId());
        user1.setFirstname(user.getFirstname());
        user1.setLastname(user.getLastname());
        user1.setEmail(user.getEmail());
        user1.setDob(user.getDob());
        user1.setGender(user.getGender());
       /* user1.setEducation(user.getEducation());
        user1.setCompany(user.getCompany());
        user1.setSalary(user.getSalary());*/
        return userRepository.save(user1);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}

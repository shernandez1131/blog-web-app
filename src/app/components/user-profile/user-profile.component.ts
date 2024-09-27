import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User(); // Initialize user

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }

  updateUser() {
    this.userService.updateUserProfile(this.user).subscribe(
      (response) => {
        console.log('User profile updated successfully', response);
      },
      (error) => {
        console.error('Error updating user profile', error);
      }
    );
  }
}

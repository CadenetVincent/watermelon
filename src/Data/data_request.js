
 export function parsing_user_file()
 {
   var LocalUsers = "";

   if (localStorage.getItem("list_users") === null) {

  LocalUsers= require("../Data/users.json");

   }else
   {

  LocalUsers = JSON.parse(localStorage.getItem("list_users"));

   }

   return LocalUsers;
 }

 export function get_current_user()
 {
  return JSON.parse(localStorage.getItem("connected_user"));
 }
 

 export function validate_field_user(fieldName,value,formErrors,user)
 {
 	  switch(fieldName) {

      case 'first_name_users':
      formErrors.first_name_users = value.length >= 2 ? 'ready' : 'First name is too short.';
      formErrors.first_name_users = value == ""  ? '' : formErrors.first_name_users;
      break;

      case 'last_name_users' :
      formErrors.last_name_users = value.length >= 2 ? 'ready' : 'Last name is too short.';
      formErrors.last_name_users = value == ""  ? '' : formErrors.last_name_users;
      break;

      case 'email_users':
      formErrors.email_users = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? 'ready' : 'Email is invalid.';
      formErrors.email_users = value == ""  ? '' : formErrors.email_users;
      break;

      case 'password_users':
      const regex_char = new RegExp("^(?=.*[a-z])");
      const regex_digit = new RegExp("^(?=.*[0-9])");
      formErrors.password_users = value.length >= 6 ? 'ready' : 'Password is too short';
      formErrors.password_users = regex_char.test(value) ? 'ready' : 'Your password must contain at least one letter.';
      formErrors.password_users = regex_digit.test(value) ? 'ready' : 'Your password must contain at least one digit.';
      formErrors.password_users = value == ""  ? '' : formErrors.password_users;

      case 'password_users_confirm':
      formErrors.password_users_confirm = user.password_users_confirm == user.password_users ? 'ready' : 'Password confirm is not the same.';
      formErrors.password_users_confirm = value == ""  ? '' : formErrors.password_users_confirm;
      break;

      default:
      break;

    }

    return formErrors;


 }


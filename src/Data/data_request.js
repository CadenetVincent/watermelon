export function parsing_user_file() {
    var LocalUsers = "";

    if (localStorage.getItem("list_users") === null) {
        LocalUsers = require("../Data/users.json");
    } else {
        LocalUsers = JSON.parse(localStorage.getItem("list_users"));
    }

    return LocalUsers;
}

export function parsing_money(whose) {
    var LocalMoney = "";

    if (localStorage.getItem(whose) !== null) {
        LocalMoney = JSON.parse(localStorage.getItem(whose));
    } else {
        LocalMoney = undefined;
    }

    return LocalMoney;
}

export function get_current_transfert(whose, wallet) {
    var LocalMoney = parsing_money(whose);

    var ListOfTransfert = false;

    if (LocalMoney != undefined) {
        ListOfTransfert = LocalMoney.filter(function(item) {
            if (whose == "money_deposit" || whose == "money_transit") {
                if (wallet.id_wallet == item.id_wallet) {
                    return item;
                }
            } else if (whose == "money_withdrawal") {
                if (
                    wallet.id_wallet == item.debited_wallet_id ||
                    wallet.id_wallet == item.credited_wallet_id
                ) {
                    return item;
                }
            }
        });
    }

    return ListOfTransfert;
}

export function check_value_monnaie(value) {
    var error = "ready";

    var float_balance = parseFloat(value);

    var numberdecimal = 3;

    if (isNaN(float_balance) || !value.match(/^-?\d*(\.\d+)?$/)) {
        error = "Your balance is not a decimal number..";
    } else {
        if (
            undefined !== value.toString().split(".")[1] &&
            value.toString().split(".")[1].length
        ) {
            numberdecimal = value.toString().split(".")[1].length;
        } else {
            numberdecimal = 0;
        }

        if (numberdecimal > 2 || value > 10000) {
            error = "Your decimal number is too long";
        }
    }

    return error;
}

export function get_user_name_from_wallet_id(wallet_id) {
    const AllWallet = parsing_wallet_file();

    const wallet = AllWallet.filter(function(item) {
        if (item.id_wallet == wallet_id) return item;
    });

    const user = get_name_user_from_id(wallet[0].id_users);

    if (user == null || user == undefined) {
        return false;
    }

    return user;
}

export function parsing_wallet_file() {
    var LocalWallet = "";

    if (localStorage.getItem("list_wallets") === null) {
        LocalWallet = require("../Data/wallets.json");
    } else {
        LocalWallet = JSON.parse(localStorage.getItem("list_wallets"));
    }

    return LocalWallet;
}

export function get_current_wallet() {
    const actual_user = get_current_user();

    const LocalWallet = parsing_wallet_file();

    const actual_wallet = LocalWallet.filter(function(item) {
        if (item.id_users == actual_user.id_users) return item;
    });

    return actual_wallet[0];
}

export function update_wallet(actual_wallet, AllWallet) {
    var index_wallet = -1;

    for (var i = AllWallet.length - 1; i >= 0; i--) {
        if (AllWallet[i].id_wallet == actual_wallet.id_wallet) {
            index_wallet = AllWallet.indexOf(AllWallet[i]);
        }
    }

    if (index_wallet != -1) {
        AllWallet[index_wallet] = actual_wallet;

        localStorage.setItem("list_wallets", JSON.stringify(AllWallet));
    }
}

export function get_wallet_by_user_id(id) {
    const list_wallet = parsing_wallet_file();

    const actual_wallet = list_wallet.filter(function(item) {
        if (item.id_users == id) return item;
    });

    if (actual_wallet.length < 1) {
        return false;
    }

    return actual_wallet;
}

export function parsing_card_file() {
    var LocalCards = "";

    if (localStorage.getItem("list_cards") === null) {
        LocalCards = require("../Data/cards.json");
    } else {
        LocalCards = JSON.parse(localStorage.getItem("list_cards"));
    }

    return LocalCards;
}

export function parsing_card_type_file() {
    const TypeCards = require("../Data/card_types.json");

    return TypeCards;
}

export function parsing_bank_name() {
    const BankList = require("../Data/bank_list_fr.json");

    return BankList;
}

export function get_random_pattern(type_card) {
    var result = [];

    const TypeCards = parsing_card_type_file();

    var type_card_object = Object.keys(TypeCards).map((obj, i) => {
        if (TypeCards[obj].niceType == type_card) {
            return TypeCards[obj].patterns;
        }
    });

    type_card_object = type_card_object.filter(function(item) {
        return item != undefined;
    });

    type_card_object = type_card_object.toString().split(",");

    result = random_digit_pattern(type_card_object);

    return result;
}

export function random_digit_pattern(array_pattern) {
    return array_pattern[Math.floor(Math.random() * array_pattern.length)];
}

export function get_current_user() {
    return JSON.parse(localStorage.getItem("connected_user"));
}

export function get_list_user() {
    const actual_user = get_current_user();

    const result = actual_user.is_admin_users
        ? parsing_user_file()
        : "undefined";

    return result;
}

export function get_name_user_from_id(id) {
    const AllUsers = get_all_users_name();

    if (Array.isArray(AllUsers[1])) {
        const User = AllUsers[1].find(function(item) {
            return id == item;
        });

        const IndexOf = Object.keys(AllUsers[1]).find(
            key => AllUsers[1][key] === User
        );

        return AllUsers[0][IndexOf];
    }

    return AllUsers[0];
}

export function get_id_user_from_name(name) {
    const AllUsers = get_all_users_name();

    if (Array.isArray(AllUsers[0])) {
        const User = AllUsers[0].find(function(item) {
            return name == item;
        });

        const IndexOf = Object.keys(AllUsers[0]).find(
            key => AllUsers[0][key] === User
        );

        return AllUsers[1][IndexOf];
    }

    return AllUsers[1];
}

export function get_current_card(value_url) {
    var result = "";

    const actual_user = get_current_user();

    const list_cards = parsing_card_file();

    const list_current_cards = list_cards.filter(function(item) {
        if (item.user_id == actual_user.id_users) {
            return item;
        }
    });

    const list_cards_by_user_id = list_cards.filter(function(item) {
        if (item.user_id == value_url) {
            return item;
        }
    });

    if (value_url == "all") {
        result = actual_user.is_admin_users ? list_cards : list_current_cards;
    } else {
        result = actual_user.is_admin_users
            ? list_cards_by_user_id
            : "undefined";
    }

    return result;
}

export function get_all_users_name_without_verif()
{
    var result = [];

    const users_list = parsing_user_file();

    result[0] = users_list.map(function(item) {
        return item.first_name_users + " " + item.last_name_users;
    });

    result[1] = users_list.map(function(item) {
        return item.id_users;
    });

    return result;
}

export function get_all_users_name() {
    var result = [];

    const actual_user = get_current_user();

    const users_list = get_list_user();

    if (users_list != "undefined") {
        result[0] = users_list.map(function(item) {
            return item.first_name_users + " " + item.last_name_users;
        });

        result[1] = users_list.map(function(item) {
            return item.id_users;
        });
    } else {

        result[0] =
            actual_user.first_name_users + " " + actual_user.last_name_users;

        result[1] = actual_user.id_users;
    }

    return result;
}

export function date_to_date_format_json(date) {
    if (date instanceof Date) {
        var month = date.getMonth();
        var day = date.getDate();
        const year = date.getFullYear();

        day = day <= 9 ? "0" + day : day;
        month = month < 9 ? "0" + (month + 1) : month + 1;

        return month + "/" + day + "/" + year;
    } else return false;
}

export function right_access_update_card(id) {
    const actual_user = get_current_user();

    const list_card = parsing_card_file();

    const card = get_card_by_card_id(id, list_card);

    if (
        actual_user.id_users == card.user_id ||
        actual_user.is_admin_users == true
    ) {
        return true;
    }

    return false;
}

export function date_format_json_to_date(date) {
    return new Date(date);
}

export function date_format_json_to_date_picker(date) {
    if (date != false) {
        var table_date = date.split("/");

        table_date[2] = table_date[2].substring(2, 4);

        return table_date[0] + "/" + table_date[2];
    }

    return false;
}

export function get_card_by_card_id(id, list_card) {
    var card_used = "";

    for (var i = list_card.length - 1; i >= 0; i--) {
        if (list_card[i].card_id == id) {
            card_used = list_card[i];
        }
    }

    return card_used;
}

export function get_card_type_updated(card_update_id) {
    var list_card = parsing_card_file();

    var CardTypes = parsing_card_type_file();

    const card_used = get_card_by_card_id(card_update_id, list_card);

    if (card_used != "") {
        const niceType =
            card_used.credit_type.charAt(0).toUpperCase() +
            card_used.credit_type.slice(1);

        const card_type_update = {
            [card_used.credit_type]: {
                niceType: niceType,
                type: card_used.credit_type,
                patterns: [card_used.credit_number.substring(0, 4)]
            }
        };

        CardTypes = Object.assign(CardTypes, card_type_update);
    }

    return CardTypes;
}

export function get_bank_name_updated(name) {
    var AllBank = parsing_bank_name();

    AllBank.push(name);

    return AllBank;
}

export function validate_field_user(fieldName, value, formErrors, user) {
    switch (fieldName) {
        case "first_name_users":
            formErrors.first_name_users =
                value.length >= 2 ? "ready" : "First name is too short.";
            formErrors.first_name_users =
                value == "" ? "" : formErrors.first_name_users;
            break;

        case "last_name_users":
            formErrors.last_name_users =
                value.length >= 2 ? "ready" : "Last name is too short.";
            formErrors.last_name_users =
                value == "" ? "" : formErrors.last_name_users;
            break;

        case "email_users":
            formErrors.email_users = value.match(
                /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
            )
                ? "ready"
                : "Email is invalid.";
            formErrors.email_users = value == "" ? "" : formErrors.email_users;
            break;

        case "password_users":
            const regex_char = new RegExp("^(?=.*[a-z])");
            const regex_digit = new RegExp("^(?=.*[0-9])");
            formErrors.password_users =
                value.length >= 6 ? "ready" : "Password is too short";
            formErrors.password_users = regex_char.test(value)
                ? "ready"
                : "Your password must contain at least one letter.";
            formErrors.password_users = regex_digit.test(value)
                ? "ready"
                : "Your password must contain at least one digit.";
            formErrors.password_users =
                value == "" ? "" : formErrors.password_users;

        case "password_users_confirm":
            formErrors.password_users_confirm =
                user.password_users_confirm == user.password_users
                    ? "ready"
                    : "Password confirm is not the same.";
            formErrors.password_users_confirm =
                value == "" ? "" : formErrors.password_users_confirm;
            break;

        default:
            break;
    }

    return formErrors;
}

export function validate_field_card(fieldName, value, formErrors) {
    switch (fieldName) {
        case "number":
            formErrors.number = "ready";

            const regex_digit_only_nbr = new RegExp("^[0-9]+$");

            if (value.length > 22) {
                formErrors.number = "Credit card number is too long.";
            }
            if (value.length < 16) {
                formErrors.number = "Credit card number is too short.";
            }

            formErrors.number = regex_digit_only_nbr.test(value)
                ? formErrors.number
                : "Only digit is accepted.";
            formErrors.number = value == "" ? "" : formErrors.number;

            break;

        case "name":
            formErrors.name = "ready";
            formErrors.name =
                value != "undefined"
                    ? formErrors.name
                    : "You must to select a name.";
            formErrors.name = value == "" ? "" : formErrors.name;

            break;

        case "cvc":
            formErrors.cvc = "ready";

            const regex_digit_only_cvc = new RegExp("^[0-9]+$");

            if (value.length > 4) {
                formErrors.cvc = "CVC is too long.";
            }
            if (value.length < 3) {
                formErrors.cvc = "CVC is too short.";
            }

            formErrors.cvc = regex_digit_only_cvc.test(value)
                ? formErrors.cvc
                : "Only digit is accepted.";
            formErrors.cvc = value == "" ? "" : formErrors.cvc;

            break;

        case "card_type":
            formErrors.card_type = "ready";
            formErrors.card_type =
                value != "undefined"
                    ? formErrors.card_type
                    : "You must to select a card type.";
            formErrors.card_type = value == "" ? "" : formErrors.card_type;

            break;

        case "bank_name":
            formErrors.bank_name = "ready";
            formErrors.bank_name =
                value != "undefined"
                    ? formErrors.bank_name
                    : "You must to select a bank name.";
            formErrors.bank_name = value == "" ? "" : formErrors.bank_name;

            break;

        case "date":
            formErrors.date = "ready";

            const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

            const is_date_form = date_to_date_format_json(value);

            if (is_date_form != false) {
                if (!date_regex.test(date_to_date_format_json(value))) {
                    formErrors.date = "Invalid type of date";
                }
            } else {
                formErrors.date = "The input is not a date";
            }

            formErrors.date = value == "" ? "" : formErrors.date;

            break;

        default:
            break;
    }

    return formErrors;
}

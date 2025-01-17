

const validate = (data) => {
    const errors = {};

    console.log(data)

    if (data?.fullName) {
        // Name validation (alphabets only, no spaces)
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        if (!data.fullName || !nameRegex.test(data.fullName)) {
            errors.fullName = "Name should only contain alphabets";
        }
    }
    if (data?.username) {
        // Username validation (alphabets, numbers, underscores, no spaces)
        const usernameRegex = /^[A-Za-z0-9_]{5,}$/;
        if (!data.username || !usernameRegex.test(data.username)) {
            errors.username = "Username should only contain letters, numbers, and underscores (no spaces).";
        }
    }

    if(data?.phoneNumber){
        const phoneRegex = /^\d{10}$/;
        if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
            errors.phoneNumber = "Phone number must be exactly 10 digits.";
        }
    }

    // Email validation
    if(data?.email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = "Please provide a valid email address.";
        }
    }
    if(data?.password){
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!data.password || !passwordRegex.test(data.password)) {
            errors.password = "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
        }
    }


   

    return errors;
};

export default validate;
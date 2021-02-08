class Employee {
    constructor(name,id, email, github, role = 'Employee') {
        this.name = name;
        this.email = email;
        this.id = id;
        this.github = github;
        this.role = role
    }

    getName(){
        return this.name; 
    }

    getEmail(){
        return this.email;
    }

    getId(){
        return this.id;;
    }

    getRole(){
        return this.role;
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Employee;
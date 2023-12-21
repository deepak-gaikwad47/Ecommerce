- question
    - what is javascript? (Introduction)
    - why javascipt used? 
    1. hoisting - is javascipt default behaviour of moving all declaration to the top of current scope.

    2. promise - A promise object represents eventual completion or failure of an asynchronous operation and its resulting value.

    3. promise API - promise.all, promise.any, promise.allSettled, promise.race
        - promise.all - resolved only when all given promise are resolved and it will reject when any of the promise reject.
          - Example
            const promise1 = Promise.resolve(3);
            const promise2 = 42;
            const promise3 = new Promise((resolve, reject) => {
              setTimeout(resolve, 100, 'foo');
            });
            
            Promise.all([promise1, promise2, promise3]).then((values) => {
              console.log(values);
            });
            // Expected output: Array [3, 42, "foo"]

        - promise.settledAll - resolved when all the given promises have either fulfilled or rejected.
          - Example
            const promise1 = Promise.resolve(3);
            const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
            const promises = [promise1, promise2];

            Promise.allSettled(promises).
              then((results) => results.forEach((result) => console.log(result)));

            // Expected output:
            // Object { status: "fulfilled", value: 3 }
            // Object { status: "rejected", reason: "foo" }

        - promise.any - will return first promise that is resolved in an iterable list of promises.
          - if all the promises are rejected or if the list of promises is empty then we will get aggregateError.
          - Example
            const promise1 = Promise.reject(0);
            const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
            const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));
            
            const promises = [promise1, promise2, promise3];
            
            Promise.any(promises).then((value) => console.log(value));
            
            // Expected output: "quick"

        - promise.race - return new promise that fuilfils or rejected as soon as there is one promise that fulfills or rejects, with the value or reason from that promise. 
          - Example
            const promise1 = new Promise((resolve, reject) => {
              setTimeout(resolve, 500, 'one');
            });

            const promise2 = new Promise((resolve, reject) => {
              setTimeout(resolve, 100, 'two');
            });

            Promise.race([promise1, promise2]).then((value) => {
              console.log(value);
              // Both resolve, but promise2 is faster
            });
            // Expected output: "two"

        - promise.resolve - creates resolved promise with result value.
          - Example
            const promise1 = Promise.resolve(123);
            promise1.then((value) => {
              console.log(value);
              // Expected output: 123
            });


        - promise.reject - creates rejected promise with error.
          - Example 1
            const promise1 = Promise.reject(123);

            promise1.then((value) => {
              console.log(value);
              // Expected output: 123
            }).catch((err)=>{
              console.log('err', err)
            });
          - Example 2
            const promise1 = Promise.reject(new Error('error'));
            promise1.then((value) => {
              console.log(value);
              // Expected output: 123
            }).catch((err)=>{
              console.log('err', err.message)
            });


    4. Async/await - allows us to write promise based code
        - we use async keyword with function to represent that the function is an asynchronous function.
        - an async function return a promise.
        - the await keyword used inside async function.
        - the use of await pause the async function untill the promise return a result value.
    
    5. callback function - **is function passes as an argument to another function**. Example - setTimeout, setInterval
        - Callback function is **useful when you have to wait for a result that takes time.**
        - The benefit of using a callback function is that you can wait for the result of a previous function call and then execute another function call.
        - **Callbacks are often used with asynchronous code to ensure that a task is completed before moving on to the next task.**    

        - **Asynchronous code:** When you want to perform a task that takes some time to complete, like making an API call or reading a file from disk, you typically use a callback function to handle the result of the operation. For example, in **Node.js, the readFile() function takes a callback function as its second argument, which will be called when the file has been read:**
          - const fs = require('fs');
            fs.readFile('file.txt', function(err, data) {
              if (err) {
                console.error(err);
              } else {
                console.log(data);
              }
            });
        - Event handling: **In a web application, you often want to perform some action in response to a user event, like clicking a button or typing in a text field.** You can use a callback function to handle the event, like this:
          - const button = document.getElementById('my-button');
            button.addEventListener('click', function() {
              console.log('Button clicked');
            });
        - Higher-order functions: **Functions that take other functions as arguments or return functions as their result are called higher-order functions.** 
          - **Higher-Order function is a function that receives a function as an argument or returns the function as output.**
          - These functions often use callback functions to customize their behavior. For example, the map() function on an array takes a callback function as its argument, which is used to transform each element of the array:
          - const numbers = [1, 2, 3, 4, 5];
            const squared = numbers.map(function(num) {
              return num * num;
            });
           console.log(squared); // [1, 4, 9, 16, 25]


    6. callback Hell or pyramid of doom - The phenomenon which happens when we nest multiple callback within in function is called callback hell.
        - we can avoid the callbcak hell with the help of promises.

    7. this Keyword 
      - The **this** keyword refers to an object. The **this** keyword refers to different object depending on how it is used.

    8. decoraters - k is a wrapper around the function that alters its behaviour.
        - **types???**
    
    9. function binding - bind() allows you to create a new function from an existing function,**change the new function's this context**, and **provide any arguments you want the new function to be called with**.
        - The real problem occurs **when we use functions as object methods and assign them to variables or use as callbacks**. Then they to loose this context.
            const user = {
              age: 20,
              getAge: function() {
                return this.age;
              }
            }
            user.getAge() // 20;
            const getUserAge = user.getAge;
            getUserAge() // undefined
        - Another real-world example is handling DOM element events. Again, if you will use an object method, that has this keyword, it will lose context, and this will be reassigned to the DOM element itself:
            const user = {
              name: 'Bob',
              greet: function() {
                return 'Hello ' + this.name;
              }
            }
            const button = document.getElementById('btn');
            button.addEventListener('click', user.greet); // Hello undefined
            button.addEventListener('click', user.greet.bind(user)); // Hello 
    
    -  Bind() is similar to call() and apply(). However, bind() returns a function that can be executed later rather than executing it immediately.
    - The call() method **calls the function with** **a given this value and arguments provided individually**.
    - The apply() method calls the specified function with a **given this value, and arguments provided as an array(or an array-like object)**.
    - **Example of bind**
      const person = {
        name: "John",
        age: 30,
        greet: function() {
          console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
      }

      const friend = {
        name: "Jane",
        age: 25,
      };

      const greetFriend = person.greet.bind(friend);
      greetFriend(); // Output: Hello, my name is Jane and I am 25 years old.

    - **Example of call**
      const person = {
        name: "John",
        age: 30,
        greet: function() {
          console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
      }

      const friend = {
        name: "Jane",
        age: 25,
      };

      person.greet.call(friend); // Output: Hello, my name is Jane and I am 25 years old.

    - **Example of appply**
      const person = {
        name: "John",
        age: 30,
        greet: function(greeting, punctuation) {
          console.log(`${greeting}, my name is ${this.name} and I am ${this.age} years old${punctuation}`);
        }
      }

      const friend = {
        name: "Jane",
        age: 25,
      };

      person.greet.apply(friend, ["Hi", "!"]); // Output: Hi, my name is Jane and I am 25 years old!

    - **differnce between call and apply**
        const person = {
          name: "John",
          age: 30,
          greet: function(greeting, punctuation) {
            console.log(`${greeting}, my name is ${this.name} and I am ${this.age} years old${punctuation}`);
          }
        }

        const friend = {
          name: "Jane",
          age: 25,
        };

        person.greet.call(friend, "Hi", "!"); // Output: Hi, my name is Jane and I am 25 years old!
        person.greet.apply(friend, ["Hello", "?"]); // Output: Hello, my name is Jane and I am 25 years old?


    10. Named Function Expression - **Named Function Expression, or NFE, is a term for Function Expressions that have a name.**
        - There are two special things about the Named Function Expression:
            - **It allows the function to reference itself internally**.
            - **It is not visible outside of the function**.
        - Example
          // Named Function Expression
          const sum = function addNumbers(a, b) {
            return a + b;
          };

          console.log(sum(2, 3)); // Output: 5
          console.log(addNumbers(2, 3)); // Throws ReferenceError: addNumbers is not defined

        - Usage 
          - Recursive Functions: 
            - **NFEs can be used to create recursive functions that call themselves by their name.** 
            - Here's an example:
              const factorial = function findFactorial(n) {
                if (n === 1) {
                  return 1;
                }
                return n * findFactorial(n - 1);
              };

              console.log(factorial(5)); // Output: 120
          - Closures:
            - NFEs can also be used to create closures, which are functions that have access to variables in their parent function's scope even after the parent function has returned. 
            - Here's an example:
              function createCounter() {
                let count = 0;

                const counter = function increment() {
                  count++;
                  console.log(count);
                };

                return counter;
              }

              const myCounter = createCounter();
              myCounter(); // Output: 1
              myCounter(); // Output: 2
              myCounter(); // Output: 3




    - The Javascript Function Expression is **used to define a function inside any expression**.

    11. IIFF - (immediately invoked function execution) function expression is created and executed immediately
    
    12. clouser - a clouser is a function that remembers its outer variables and can access them.
      - Example
        // javascript closure example
        // outer function
        function greet() {       
            // variable defined outside the inner function
            let name = 'John';
              // inner function
              function displayName() { 
                // accessing name variable
                return 'Hi' + ' ' + name;
            }
            return displayName;
        }
        const g1 = greet();
        console.log(g1); // returns the function definition
        console.log(g1()); // returns the value
        **output ---->**
        function displayName() {
          // accessing name variable
          return 'Hi' + ' ' + name;
        }
        Hi John

    13. arrow function 
    14. execution context. 
    15. heap, call stack, web api, callback queue, event loop, microtask queue.

- Arrow function 
    - **Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.**
    - **Arrow functions cannot be used as constructors. Calling them with new throws a TypeError.** They also **don't have access to the new.target keyword**.
    - Arrow functions cannot use yield within their body and cannot be created as generator functions.
    - Arrow function expressions should only be used for non-method functions because they do not have their own this.
    - The this inside the arrow function's body will correctly point to the instance (or the class itself, for static fields). However, because it is a closure, not the function's own binding, the value of this will not change based on the execution context.
    - For similar reasons, the call(), apply(), and bind() methods are not useful when called on arrow functions, because **arrow functions establish this based on the scope of the arrow function is defined within**, and **the this value does not change based on how the function is invoked**.
    
- ***Execution contexts***
    There are two types of execution contexts: global and function. 
    - **global execution context** - Code outside of any function is in the global execution context.
        - variables within the global execution context with the initial values as undefined.
    - **function execution context** - Each function has its own execution context, but it’s created when the function is invoked or called.
    - **Eval Function Execution Context**— Code executed inside an eval function also gets its own execution context, 

- Execution context stack (ECS): 
    - Execution context stack is a stack data structure, i.e. last in first out data structure, **to store all the execution stacks created during the life cycle of the script**. 
    - Global execution context is present by default in execution context stack and it is at the bottom of the stack. 
    - While executing the global execution context code, if JS engines find a function call, it creates a functional execution context for that function and pushes it on top of the execution context stack. 
    - JS engine executes the function whose execution context is at the top of the execution context stack. 
    - Once all the code of the function is executed, JS engines pop out that function’s execution context and start’s executing the function which is below it.

    - JavaScript engine creates the execution context in the following two stages:
        - Creation phase
            - The creation phase includes creating the global and function execution contexts, creating the scope chain, and allocating memories for the function and variables with the initial values as undefined .
        - Execution phase
            - During the execution phase, the JavaScript engine executes the code line by line, assigns the values to variables, and executes the function calls.

        - The ***creation phase*** includes creating the global and function execution contexts, creating the scope chain, and allocating memories for the variables and functions. During the ***execution phase***, the JavaScript engine executes the code line by line. This includes evaluating and executing statements

- **Memory allocation in JavaScript:**
    1. Heap memory: Data stored randomly and memory allocated.
    2. Stack memory: Memory allocated in the form of stacks. Mainly used for functions.

- The heap
    - The heap, also called the ‘memory heap’, is a section of unstructured memory that is used for the allocation of objects and variables.
- The call stack or Execution context stack
    - The call stack is a data structure that keeps track of where we are in the program and runs in a last-in, first-out way. Each entry in the stack is called a stack frame. 
- Web APIs
    - **Web API works asynchronously: means your JS program asks this API to do some job in the background and return result once that job is done and in the meanwhile JS can continue with it’s own jobs.**
    - **enables to do things concurrently outside of the JavaScript interpreter** (the language itself is single-threaded, but the browser APIs act as separate threads)
    - **The Web APIs are not a part of the JavaScript engine, but they are part of the runtime environment provided by the browser**. There are a large number of APIs available in modern browsers that allow us to a wide variety of things.
    - extra    
        - Web API is an application that provides various functionalities to deal with DOM , use fetch(), setTimeout() etc. When you will log window object, you can see various properties and methods returned by it, that is what Web API is.
        - Web API takes care of this job in the background.
        - Features like event listeners, timing functions and AJAX requests all sit in the Web APIs container until an action gets triggered. A request finishes receiving its data, a timer reaches its set time or a click happens and this triggers a callback function to be sent to the callback queue.
- The Callback Queue or Message Queue or Event Queue or task queue
    - **The callback queue stores the callback functions sent from the Web APIs** in the order in which they were added. **This queue is a data structure that runs first in, first out.**
- The event loop
    - **Event loops monitor the state of the call stack and callback queue continuously.**
      **If the stack is empty it will grab a callback from the callback queue** 
      **and put it onto the call stack, scheduling it for execution.**
    - extra
        - The job of the event loop is to constantly monitor the state of the call stack and the callback queue. If the stack is empty it will grab a callback from the callback queue and put it onto the call stack, scheduling it for execution.
        - The only job of the event loop is to look at callback queue and once there is something pending in callback queue, push that callback to the stack. The event loop pushes one callback function at a time, to the stack, once the stack is empty. Later, the stack will execute the callback function.
- Microtask queue
    - **Promise handling is always asynchronous, as all promise actions pass through the internal “promise jobs” queue, also called “microtask queue”** (V8 term).
    - **it's like task queue but has higher priority**
    - **handles Microtasks callbacks**
    - Basically, use microtasks when you need to do stuff asynchronously in a sequence.
    - Microtask Queue has higher priority than Callback Queue of fetching the callback functions to Event Loop.
    - Microtask queue is processed after the current task is finished. The Callback queue is processed after the microtask queue is empty.
    - promise handlers and mutation observers go though the microtask queue
    - scheduled for things that should happen straight after the currently executing script, such as reacting to a batch of actions, or to make something async without taking the penalty of a whole new task

- class
    - Classes were introduced in EcmaScript 2015 (ES6) **to provide a cleaner way to follow object-oriented programming patterns.**
    - The JavaScript class **contains various class members within a body including methods or constructor**.
    - JavaScript **still follows a prototype-based inheritance model**. Classes in JavaScript are **syntactic sugar over the prototype-based inheritance model** which we use to implement OOP concepts.
    - Thus the introduction of classes in JS made it easier for developers to build software around OOP concepts. 

- Class Expression
    - **The Javascript Class Expression is used to define a class inside any expression.**
    - In javascript, class expression refers to way to define class in which the class name is assigned to a variable.
    - **The class expression can be named or unnamed. If named, the class name is used internally, but not outside of the class.**

- getter and setter in classes 
    - A getter is a method in a class that is **used to retrieve the value of an object property**, while a setter is method **used to set or update the value of an object property**.
    - In javascript, **getter and setter are defined using the "get" and "set" keywords** in an objects class definition.
    - example 
        class Person {
          constructor(name) {
            this._name = name;
          }

          get name() {
            return this._name;
          }

          set name(value) {
            this._name = value;
          }
        }

        const person = new Person("John Doe");
        console.log(person.name); // outputs: "John Doe"
        person.name = "Jane Doe";
        console.log(person.name); // outputs: "Jane Doe"

- The extends keyword 
    - The extends keyword in javascript **is used in class based inheritance** and is part of the es6 sytax. its allows a **class to inherit properties and methods from a parent class**.

- Overriding a method
    - **In a javascript you can override a method by simply re-declaring the method with the same name in subclass.** The new method will overwrite the parent class method, and the subclass will use the new implementaion instead of the parent class implementation.

- Overriding constructor
    - In javascipt, **you can't override a constructor in a traditional sense like in OOPS langauges.**
    - However, you can simulate this behaviour by creating a subclass of base class, and then writing a constructor for the subclass that calls te base class constructor and modified the properties as needed.
    - **super is used to call base class constructor**

- super 
    - The super keyword in javascript **refers to the parent class or object**.
    - it is used to call its constructor, access its properties, or override in methods.
    - Example
        class Parent {
          constructor(name) {
            this.name = name;
          }

          printName() {
            console.log(this.name);
          }
        }

        class Child extends Parent {
          constructor(name, age) {
            super(name);
            this.age = age;
          }

          printAge() {
            console.log(this.age);
          }
        }

        const child = new Child('John', 30);
        child.printName(); // Output: John
        child.printAge(); // Output: 30

- static properties in class
    - In javascript, **a static property is a property associated with a class rather than an instance of the class.**
    - This means that static properties are shared among all the instance of the class and can be accessed without createing an instance of the class.
    - example
        class MyClass {
            static myStaticProperty = 'some value';

            static myStaticMethod() {
                console.log(this.myStaticProperty);
            }
        }

        console.log(MyClass.myStaticProperty); // Output: 'some value'
        MyClass.myStaticMethod(); // Output: 'some value'

- Inheritance of static properties and methods
    - **Static properties and methods can be accessed using the class name, without creating an instance of the class.**
    - When it comes to inheritance, static properties and methods are inherited by child classes. This means that **if a parent class has a static property or method, that property or method is accessible on the child class**. **The child class can also override the parent's static property or method by declaring its own with the same name.**
    - Example
        class Parent {
          static parentStaticMethod() {
            return 'Parent Static Method';
          }
        }

        class Child extends Parent {
          static childStaticMethod() {
            return 'Child Static Method';
          }
        }

        console.log(Child.parentStaticMethod()); // Output: 'Parent Static Method'
        console.log(Child.childStaticMethod()); // Output: 'Child Static Method'

- Private and protected properties and methods

    - In JavaScript, methods can be defined within an object, either as a private method or a protected method. **Private methods are those methods that are only accessible within the same class** and **protected methods are those methods that can be accessed within the same class and its subclasses**.
    - Here's an example of private and protected methods in JavaScript using the class syntax:

    - Example
        class Person {
          constructor(name) {
            this._name = name;
          }

          // private method
          _sayHello() {
            console.log(Hello, my name is ${this._name});
          }

          // protected method
          speak() {
            this._sayHello();
          }
        }

        class Student extends Person {
          constructor(name, major) {
            super(name);
            this._major = major;
          }

          sayMajor() {
            console.log(I am studying ${this._major});
          }

          // accessing protected method
          introduce() {
            this.speak();
            this.sayMajor();
          }
        }

        const john = new Student("John", "Computer Science");
        john.introduce();
        // Output:
        // Hello, my name is John
        // I am studying Computer Science

    - Note that, in JavaScript, there are no strict private or protected methods, but the convention is to **use an underscore prefix to indicate that a method is intended to be private.**

- Internal and external interface
    - In object-oriented programming, properties and methods are split into two groups:
    - Internal interface – **methods and properties, accessible from other methods of the class, but not from the outside.**
    - External interface – **methods and properties, accessible also from outside the class.** 

- Read-only “power”
    - To ensure that a class istance methods and properties can only be accessed and modified within the class and not outsside of it, the class can use access modifiers such as private and protected.
    - In javascript this is achieved through closure and naming conventions.
    - Example 
        - private property by prefixing the property name with underscore.

- Class checking: "instanceof" 
    - **The instanceof operator allows to check whether an object belongs to a certain class.** It also takes inheritance into account.
    - Example
      function Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
      }
      const auto = new Car('Honda', 'Accord', 1998);

      console.log(auto instanceof Car);
      // Expected output: true

      console.log(auto instanceof Object);
      // Expected output: true


- Mixins 
    - **Mixins in JavaScript allow objects to inherit properties and methods from other objects.** This is achieved by copying properties from one object to another, rather than through inheritance.
    - Here's an example:
        const mixin = (target, ...sources) => {
          Object.assign(target, ...sources);
        };

        const canEat = {
          eat: function(food) {
            console.log(Eating ${food});
          }
        };

        const canWalk = {
          walk: function() {
            console.log('Walking');
          }
        };

        const person = {
          name: 'John Doe'
        };

        mixin(person, canEat, canWalk);

        console.log(person.name); // John Doe
        console.log(person.eat); // function eat(food) {...}
        console.log(person.walk); // function walk() {...}

        person.eat('banana'); // Eating banana
        person.walk(); // Walking


- prototype
  - In JavaScript, prototypes are used to create new objects that inherit properties and methods from an existing object, known as the prototype object. 
  - **In javascript, prototypes are used to implement inheritance and share properties and methods between objects.**
  - Here is a simple example:
    // Define a constructor function for creating Person objects
    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    // Add a fullName method to the prototype of the Person object
    Person.prototype.fullName = function() {
      return this.firstName + " " + this.lastName;
    };

    // Create a new person object
    var person = new Person("John", "Doe");

    // The person object has access to the fullName method
    console.log(person.fullName()); // Output: "John Doe"

- Prototypal Inheritance
    - **Prototypal Inheritance is a way of implementing inheritance in JavaScript**, **where an object can inherit properties and methods from its prototype**. In JavaScript, every object has a prototype, which is an object that it inherits properties and methods from.
    - Here's an example of how prototypal inheritance works:
        let animal = {
          eats: true
        };

        let rabbit = {
          jumps: true
        };

        rabbit.__proto__ = animal;

        console.log(rabbit.eats); // true
    - It's important to note that while proto is a property that is available in modern browsers, it is considered non-standard and it is recommended to use Object.create instead:
        let animal = {
          eats: true
        };

        let rabbit = Object.create(animal);
        rabbit.jumps = true;

        console.log(rabbit.eats); // true

- proto is a non-standard property that **allows you to access an object's prototype.** The property is not supported in all JavaScript environments and its usage is generally discouraged. However, you can use proto like this:
  let obj = {};person
  let proto = {a: 1};
  obj.__proto__ = proto;
  console.log(obj.a); // 1 
person
- On the other hand, **.prototype is a property of a constructor function that is used to define the properties and methods that will be shared by all objects created using that constructor**. Here's an example:

  function Person(name) {
      this.name = name;
  }

  Person.prototype.sayHello = function() {
      console.log("Hello, my name is " + this.name);
  }

  let person1 = new Person("John");
  person1.sayHello(); // "Hello, my name is John"

- f.prototype
    - f.prototype in JavaScript refers to the **prototype property of a constructor function f.** The prototype property is an object that acts as a blueprint for all instances of the constructor function.
    - In JavaScript, objects are created by constructors, and all objects created by the same constructor share a prototype object. When properties or methods are added to the constructor's prototype object, they become available to all instances of that constructor.
        function Foo() {
        }

        Foo.prototype.bar = function() {
          console.log('Hello, World!');
        };

        const foo = new Foo();
        foo.bar(); // Output: "Hello, World!"

- native prototypes
    - In JavaScript, native prototypes are prototypes that are built into the language and provide a set of properties and methods for the objects created from the respective constructors.
    - For example, all objects in JavaScript inherit from the Object prototype, which provides methods such as toString(), valueOf(), hasOwnProperty(), etc. Arrays, Numbers, Strings, etc. have their own prototypes that provide specific properties and methods for each data type.

    - Here's an example:

        const array = [1, 2, 3];
        console.log(array.proto === Array.prototype); // Output: true
        console.log(array.proto.proto === Object.prototype); // Output: true

        const number = 42;
        console.log(number.proto === Number.prototype); // Output: true
        console.log(number.proto.proto === Object.prototype); // Output: true

        const string = "Hello, World!";
        console.log(string.proto === String.prototype); // Output: true
        console.log(string.proto.proto === Object.prototype); // Output: true
     
- proxy and reflect
    - A proxy in javascript is an object that **acts as an middleware for property access.**
    - The proxy object is **created with a target object and handler object as its parameter.**
    - **The target object is the object whose properties we want to access.**
    - **Handler object defines custom behavior for fundamental operations.** such as getting and setting properties, deleting properties, enumerating properties, and so on.

    - A proxy object performs some operations on behalf of the real object.
    - **With Proxy, encapsulation can be implemented easily**, hence developers can prevent/control access to a resource that is too expensive to create and also prevent incorrect or malicious use of the resource.
    - (encapsulation means way to restrict the direct access to data)
    - JavaScript Proxy is a feature that allows you to intercept and customize operations performed on objects. It provides a way to intercept and customize operations such as getting and setting properties, deleting properties, enumerating properties, and so on.
    - let myObject = {name: "Alice", age: 25};
      let myProxy = new Proxy(myObject, {
        get: function(target, property) {
          console.log("Accessing property: " + property);
          return target[property];
        },
        set: function(target, property, value) {
          console.log("Setting property::::: " + property, value);
          if(value){
          return target[property]= value;
          }
          return target[property]='NA'
        }
      });
      myProxy.abc = undefined;
      // console.log(myProxy.name); // Output: Accessing property: name   Alice
      // console.log(myProxy.age); // Output: Accessing property: age   25
      console.log(myProxy.abc);

    - The Reflect API provides global Reflect object which has static methods that can be used for introspection. These methods are used to discover low level information about the code. The Reflect API can be used to build automation testing frameworks that examine and introspect program at runtime

- Event Listeners:
  - **Event listeners are functions that are attached to DOM elements and are called in response to specific events**, such as a **button click, a form submission, or a page load**. 
  - **Event listeners are often used to handle user input or interaction**.
  - **When an event is triggered, the event listener is called and the code inside the event listener function is executed.**
  
  - In summary, Promises, callbacks, and event listeners are all tools for handling asynchronous code in JavaScript. Promises are objects that represent the result of an asynchronous operation and provide a way to handle the result or error of the operation. Callbacks are functions that are passed as arguments to another function and are executed once the parent function completes its task. Event listeners are responsefunctions that are attached to DOM elements and are executed in response to specific events.

  - Example 
    <script>
    var x = document.getElementById("myBtn");
    x.addEventListener("mouseover", myFunction);
    x.addEventListener("click", mySecondFunction);
    x.addEventListener("mouseout", myThirdFunction);

    function myFunction() {
      document.getElementById("demo").innerHTML += "Moused over!<br>";
    }

    function mySecondFunction() {
      document.getElementById("demo").innerHTML += "Clicked!<br>";
    }

    function myThirdFunction() {
      document.getElementById("demo").innerHTML += "Moused out!<br>";
    }
    </script>

- mutable and immutable functions
  - In programming, mutable and immutable functions refer to the ability to modify the data that they are given as input. A mutable function can modify the data that is passed to it, while an immutable function cannot modify the data and returns a new value instead. 
    - **Mutable functions** are those that have **the ability to change the state of the input data.**
      - These functions modify the data directly and change the original data. Any change made in the input data is reflected outside the function.
    - **Immutable functions** are those that **do not change the state of the input data.**
      - These functions do not modify the data directly but return a new value with the desired changes. The input data remains the same outside the function.
    - **Example:** function takes a number and a list as input, and adds the number to the list using the .push() method. The original list is modified and the function returns the modified list.
    - **Example:** function takes a number and an array as input, and returns a new array with the number added to the end using the spread syntax. The original array is not modified and the function returns a new array instead. 


- HOC function
  - In JavaScript, Higher-Order Functions (HOCs) are a **common pattern that are used to add functionality to existing functions.** 
  - HOCs are functions that **take one function as an argument and return another function with additional functionality**.
  - example 1
    // HOC function that logs the input arguments and output of a function
    function withLogging(fn) {
      return function(...args) {
        console.log(`Calling function ${fn.name} with arguments: ${args}`);
        const result = fn(...args);
        console.log(`Function ${fn.name} returned: ${result}`);
        return result;
      };
    }

    // Example function that adds two numbers
    function add(a, b) {
      return a + b;
    }

    // Create a new function with the HOC
    const addWithLogging = withLogging(add);

    // Call the new function
    const result = addWithLogging(1, 2);
    console.log(result);
  
  - example 2
    const twice = (f, v) => {
      console.log(f(f(v)))
      return f(f(v))}
    const add3 = v => v * 2
    console.log(twice(add3, 7)) // 28

  -  HOCs can be used to add a wide variety of functionality to existing functions, making them a powerful tool for code reuse and abstraction.

- Various ways by which we can query our backend server
  - XMLHttpRequest (XHR): XMLHttpRequest is a built-in JavaScript object that allows you to send HTTP requests to a server and receive responses. 
    - Example
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://example.com/api/data');
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.log('Request failed. Status: ' + xhr.status);
        }
      };
      xhr.send();

  - Fetch API: The Fetch API is a modern alternative to XHR that provides a simpler and more flexible interface for making HTTP requests. 
    - Example
      fetch('https://example.com/api/data')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log('Request failed:', error));

- Axios: 
  Axios is a popular JavaScript library for making HTTP requests. It provides a simple API and supports features like request and response interception, error handling, and more. Here's an example of sending a GET request using Axios:

- difference 
  - Axios is a stand-alone third party package that can be easily installed.
  -	Fetch is built into most modern browsers; no installation is required as such.
  - Axios uses the data property.	
  - Fetch uses the body property.
  - Axios’ data contains the object.
  -	Fetch’s body has to be stringified.
  - Axios “GET” call ignores data content.
  -	Fetch “GET” call can have body content.

- XHR
  - there's no way to not send cookies (apart from using the non-standard mozAnon flag or the AnonXMLHttpRequest constructor)
  - can't return FormData instances
  - doesn't have an equivalent to fetch's **no-cors mode**
  - always follow redirects
  - Security restrictions: XMLHTTPRequest is subject to the same origin policy, which means that it can only make requests to the same domain as the page it is running on. This can make it difficult to use with external APIs or services.

- How to get a state value just after it gets updated?
  - In React, it is not guaranteed that you will get the updated state value immediately after it is updated, as React may batch multiple state updates for performance reasons. 
  - However, there are some ways to get the updated state value just after it gets updated:

  - **Using setState with a callback function**: The setState method in React accepts a second argument, which is a callback function that gets executed after the state is updated. This callback function will have access to the updated state value. 

  - Here's an example:
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count); // logs the updated state value
    });

  - **Using useEffect with a dependency array**: You can use the useEffect hook in a functional component with a dependency array to execute a function after the state is updated. The function will be executed after every state update and will have access to the updated state value. 
  
  - Here's an example:
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      console.log(count); // logs the updated state value
    }, [count]);
    
    setCount(count + 1);

- Create uncontrolled component

  import React, { useState } from 'react';
  const UncontrolledInput = () => {
    const inputRef = React.useRef(null);
    const [input, setInput] = useState("");

    const handleSubmit = (event) => {
    
      event.preventDefault();
      const inputValue = inputRef.current.value;
      console.log('Submitted value:', inputValue);
      setInput(inputValue);
      event.target.reset();
    };
    console.log(input);

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={inputRef} />
        </label>
        <button type="submit">Submit</button>
        <p>{input}</p>
      </form>
    );
  };

  export default UncontrolledInput;

- The main **difference between Promises and async/await** is in the syntax used to write them. Promises use the then and catch methods to handle the result of an asynchronous operation, while async/await uses the await keyword to wait for the result of a Promise.

- promise vs async/await
  - Promise has 3 states – resolved, rejected and pending.	
  - It does not have any states. It returns a promise either resolved or rejected.
  - Error handling is done using .then() and .catch() methods.	
  - Error handling is done using .try() and .catch() methods.

- GET
  - Get method is used to retrieve or get the information from the given server using a given URL. In REST CURD, it performs the read operation. 

- POST
  - Post is used for sending data to the server such as uploading a file or transferring some data or adding a new row to the back end table to any kind of web form. In a simple sentence, we can say that the post method is used for inserting new items in the backend server. In REST CRUD operation it performs the create operation.

- PUT

  - If I had to change my first name then send PUT request for Update:
    { "first": "Nazmul", "last": "hasan" }
  - So, here in order to update the first name we need to send all the parameters of the data again.
  - The PUT method modifies an existing resource entirely or creates a new resource. How does it do that?
    - The API consumer sends the resource ID
    - If the resource exists, the entire resource is replaced with the entire entity
    - If the resource doesn’t exist, a new resource is created

- PATCH:

  - Patch request says that we would only send the data that we need to modify without modifying or effecting other parts of the data. Ex: if we need to update only the first name, we pass only the first name.
  - The PATCH method applies a partial update to an existing resource. This means that you only need to send the data that you want to update, and it won’t affect or change anything else. Therefore, if you want to update the first name in the database, you only need to send the first parameter. 

- DELETE 
  - The DELETE method is used to delete a resource specified by its URI.

- whether GET takes body or not

  - According to the HTTP specification, the GET request method should not include a request body in the request message. The purpose of a GET request is to retrieve a resource or information from the server, and the query parameters and headers are typically used to provide any necessary information to the server.

  - Although it is possible to include a body in a GET request, this is not recommended and may not be supported by all servers and clients. Additionally, some proxies and firewalls may strip out the body of a GET request, making it unreliable to use.

  - If you need to send data to the server, you should consider using a different HTTP request method, such as POST, PUT, or PATCH.

- Difference between HTTP and HTTPS

  1. It is an abbreviation of Hypertext Transfer Protocol	
  1. It is an abbreviation of Hypertext Transfer Protocol Secure.

  2. This protocol operates at the application layer.	
  2. This protocol operates at the transport layer.

  3. The data which is transferred in HTTP is plain text.	
  3. The data which is transferred in HTTPS is encrypted, i.e., ciphertext.

  4. By default, this protocol operates on port number 80.	
  4. By default, this protocol operates on port number 443.

  5. The URL (Uniform Resource Locator) of HTTP start with http://	
  5. The URL (Uniform Resource Locator) of HTTPS start with https://

  6. This protocol does not need any certificate.	
  6. But, this protocol requires an SSL (Secure Socket Layer) certificate.

  7. Encryption technique is absent in HTTP.	
  7. Encryption technique is available or present in HTTPS.

  8. The speed of HTTP is fast as compared to HTTPS.	
  8. The speed of HTTPS is slow as compared to HTTP.

  9. It is un-secure.	
  9. It is highly secure.

  10. Examples of HTTP websites are Educational Sites, Internet Forums, etc.	
  10. Examples of HTTPS websites are shopping websites, banking websites, etc.

- CORS 
  - "Cross-Origin Resource Sharing" refers to the situations when a frontend running in a browser has JavaScript code that communicates with a backend, and the backend is in a different "origin" than the frontend.
  - The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers

- no-cors
  - **Prevents the method from being anything other than HEAD, GET or POST, and the headers from being anything other than simple headers**
  - **"no-cors" is a mode that can be used when making requests with the JavaScript Fetch API. When making cross-origin requests** (requests to a different domain), **the browser will typically block the request due to security concerns.** However, the "no-cors" mode can be used **to make a limited type of cross-origin requests.**

  - When making a request with the "no-cors" mode, the browser will send the request with a CORS-safelisted method (such as GET or POST), and only certain types of headers are allowed. The response to the request can only include certain types of headers, and the response body can only be accessed using methods such as response.blob(), response.json(), or response.text().

  - The "no-cors" mode can be useful in certain situations, such as when making requests to a server that does not support CORS, or when making requests to an API that is only accessible from a specific domain. However, it should be used with caution, as it can potentially allow unauthorized access to resources on the server.

- how to pass array in query params javascript?
  - Example
    let myArray = [1, 2, 3];
    let queryString = "?myArray=" + encodeURIComponent(JSON.stringify(myArray));
    let url = "http://example.com/api" + queryString;
  - In the above example, JSON.stringify() is used to convert the array to a string, and **encodeURIComponent()** **is used to encode the string so that it can be safely added to the URL.** Then, the query string is added to the API endpoint URL to create the full URL with the query parameters.

  - On the server-side, you can then parse the query string and decode the array string using JSON.parse(). For example, in Node.js:

    const url = require('url');
    
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    
    // Get the array from the query string
    const myArray = JSON.parse(parsedUrl.query.myArray);

-  What Are HTTP Status Codes?
    - The 1xx status codes – informational requests
    - The 2xx status codes – successful requests
    - The 3xx status codes – redirects
    - The 4xx status codes – client errors
    - The 5xx status codes – server errors

- What is 304 code?
 **An HTTP 304 not modified status code** means that **the website you're requesting hasn't been updated since the last time you accessed it.** Typically, your browser will save (or cache) web pages so it doesn't have to repeatedly download the same information.
  - How to Fix an HTTP 304 Status Code (6 Potential Methods)
    - Clear the Browser's Cache Data.
    - Run a Malware Scan.
    - Disable Your Browser's Extensions.
    - Flush the DNS and Reset the TCP/IP.
    - Try Using the Google Public DNS.
    - Check Your Server Configuration Files for Incorrect Redirect Instructions.

- Provider
  - In the React Context API, the Provider and Consumer components are used to set up a shared data source, and to retrieve data from that source in child components.

  - **The Provider component is used to define the context and to provide the data that will be shared.** It accepts a "value" prop that can be any data type, such as a string, number, object, or even a function. The value prop is then made available to any child component that uses the matching Consumer component.

  - The Provider component is going to be used to wrap the components that are going to have access to our context.
    <NotesContext.Provider value={this.state.notes}>
    ...
    </Notes.Provider>

  - The Provider component receives a prop called value, which can be accessed from all the components that are wrapped inside Provider, and it will be responsible to grant access to the context data.

- Consumer
  - **The Consumer component is used to access the data provided by the Provider component.** It should be used inside the child component that needs the data, and takes a function as its child that receives the context value as a parameter.
  - After you wrap all the components that are going to need access to the context with the Provider component, you need to tell which component is going to consume that data.
  - The Consumer component allows a React component to subscribe to the context changes. The component makes the data available using a render prop.
    <NotesContext.Consumer>
      {values => <h1>{value</h1>}
    </Notes.Consumer>

  - Use case
    - Some sample use cases where the Context API proves helpful are: Theming — Pass down app theme. i18n — Pass down translation messages. Authentication — Pass down current authenticated user.

- why node js is a single threaded language
  - A Node.js application runs on single thread and the event loop also runs on the same thread. Hence, we can say Node.js is single-threaded
  - As Node.js follows Single-Threaded with Event Loop Model inspired by JavaScript Event-based model with JavaScript callback mechanism. So, node.js is single-threaded similar to JavaScript 
- How to manage the huge data in service API and what type of caching should be used
    - Managing huge amounts of data in a service API can be challenging, but there are several techniques that can be used to improve performance and reduce the load on your API servers. One such technique is caching.
    - Caching is the process of storing frequently accessed data in memory or on disk to reduce the number of requests made to the API server. Caching can significantly improve the performance of your application and reduce the load on your servers, especially when dealing with large amounts of data.
    - There are several types of caching that can be used in JavaScript, including:
    - Browser caching: This type of caching involves storing data in the user's browser cache. Browser caching can be useful for static data that doesn't change frequently, such as images, CSS, and JavaScript files.
    - Server-side caching: This type of caching involves storing data on the server side in memory or on disk. Server-side caching can be used to cache frequently accessed data, such as database queries or API responses.
    - CDN caching: This type of caching involves storing data on a Content Delivery Network (CDN) that is distributed across multiple servers. CDN caching can be used to improve the performance of static assets, such as images and videos, by caching them on multiple servers closer to the user. 
    - When deciding which type of caching to use, consider the type of data you are caching, the frequency of updates, and the size of the data. Additionally, be aware of the caching mechanism you are using and make sure it is set up correctly to prevent stale or outdated data from being served to users.
    - Another technique for managing large amounts of data in a service API is pagination. Pagination involves breaking up large sets of data into smaller chunks, or pages, that can be loaded and displayed incrementally. This can help reduce the amount of data that needs to be loaded at once, improving performance and reducing the load on your servers.
    - Finally, consider using a database that is designed to handle large amounts of data, such as MongoDB or Cassandra, and optimize your database queries to minimize the amount of data that needs to be fetched from the database. This can help reduce the load on your database servers and improve the performance of your API.


- HTTP Protocols
  - HTTP (Hypertext Transfer Protocol) is a standard protocol used to transfer data over the internet. HTTP is the foundation of the World Wide Web, and it is used by web browsers to request and receive web pages, as well as by web servers to send those pages to the browsers.

  - In JavaScript, HTTP protocols are used to make requests and receive responses from web  servers. JavaScript can make HTTP requests using several different methods, such as XMLHttpRequest (XHR), the Fetch API, or third-party libraries.

  - HTTP requests in JavaScript typically involve specifying a URL to request and an HTTP method to use (e.g. GET, POST, PUT, DELETE). The request can also include additional data, such as query parameters, request headers, or a request body. When the server receives the request, it sends a response back, which typically includes a status code (e.g. 200 OK, 404 Not Found), response headers, and a response body.

  - HTTP protocols are important in JavaScript because they allow web applications to communicate with web servers, retrieve data from APIs, and interact with web pages. By making HTTP requests and receiving responses, JavaScript code can dynamically update web pages, interact with APIs, and provide a more interactive and responsive user experience

- How to make node js working as multi threaded
  1. Cluster module: 
    Node.js is built on top of the V8 JavaScript engine and by default, it runs on a single thread. However, Node.js has a built-in cluster module that allows you to create child processes that can run on separate threads and take advantage of multi-core CPUs.  
  2. Worker Threads API:
    Node.js also provides a built-in worker_threads module that allows you to create worker threads that can run on separate threads and perform CPU-intensive tasks. Unlike the cluster module, which creates child processes, the worker_threads module creates lightweight threads within the same process. 
  - Note that multi-threading in Node.js can be complex and requires careful handling of shared resources and synchronization between threads. 
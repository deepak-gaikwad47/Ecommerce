React lifecycle - 
  1.***mounting***-  constructor, getDerivedStatefromProps, render, componentDidMount
  2.***updating***-  getDerivedStatefromProps, shouldComponentUpdate, render, getSnapshotBeforeUpate,   
     componentDidUpdate
  3.***unmounting***-  componentWillUnmount 
  4.***Error Handling***-  getDerivedStateFromError, componentDidCatch

***mounting***
- ***constructor(props)***-  
    1. A special function that will get called whenever a new component is created.
    2. constructor is used for 1. intialize state 2. binding events handlers to class instance.

- ***static getDerivedStatefromProps(nextProps, prevState)*** -  (Feedback)
    accpets nextProps and prevState.***
***getDerivedStatefromProps which allows us to copy props into state.***
    1. If props changes, then the state will also change accordingly else,
    getDerivedStateFromProps will returns null that indicates no change in state.
    2. getDerivedStateFromProps is invoked right before calling render(), both on the
    intial mount and on subsequent update.
    3. can't cause side effect here.
    4.***This method is supposed to return new state or it can return null.***

- ***render()***-  
    1. render method that tell react what to display on the screen.
    2. In render method, we can read props and state and return jsx code to the root 
    component of the app.
    3. we can't change the state in render method.
    4. can't cause side effects

- ***componentDidMount()***-  
    1. called only once in the whole lifecycle of the given component.
    2. This is invoked immediately after a component gets rendered and place on the DOM.
    3. we can do any DOM queries operation here.
    useEffect with empty dependency array([]).

***updating phase***
- ***static getDerivedStatefromProps(nextProps, prevState)***
    accpets nextProps and prevState.***
***getDerivedStatefromProps which allows us to copy props into state.***
    1. If props changes, then the state will also change accordingly else,
    getDerivedStateFromProps will returns null that indicates no change in state.
    2. getDerivedStateFromProps is invoked right before calling render() method, both on the
    intial mount and on subsequent update.
    3. can't cause side effect here.
    4.***This method is supposed to return new state or it can return null.***

- ***shouldComponentUpdate(nextProps, nextState)***(Feedback)
    1. receives updated props and state.
    2. purpose of this method is dictates if at all the component should re-render or not.
    3. what you can do in this method is comapare the existing props and state with next 
    state and props and return true or false. to let react know weather the component should update
    or not.
    4. can't cause side effects.
    5. if we return true inside it then it will update your component else 
    it will not going to re render your component. By default it will return false.***
    6. used for improve performance of the app.
    7. used for avoid unnecessary renders.

***For Example*** -  In amazon app -  Suppose we click on a product with four different colors. Let's say the default color is black. ShouldComponentUpdate is invoked if we click on a different color; otherwise, it isn't(If we click on a different color, ShouldComponentUpdate is invoked; otherwise, it is not).
    
- ***render()***
    1. method that tell react what to display on screen.
    2. In render method , we can read props and state and return jsx code to the root 
    component of the app.
    3. we can't change the state in render method.
    4. can't cause side effects

- ***getSnapshotBeforeUpate(prevProps, prevState)***(Feedback)
    1. this method accepts previous props and state.
    2. called right before the changes from the virtual DOM are to be reflected in the DOM.
    3. this method to capture some information from the DOM.
    NOT HOOK REPLACEMENT.
    4. In getSnapshotBeforeUpate method have access to the properties
    and state before the update i.e. even after the update you can check what the values were before the update
    5. used for show previous value of state represent on ui.

- ***componentDidUpdate(prevProps, prevState, snapshot)***
    1. method accepts three parameters -  prevProps, prevState, snapshot
    2. this method to be called only once in each re-render cycle so what you can do
    cause side effect.
    3. componentDidUpdate() is invoked immediately after updating occurs. 
    This method is not called for the initial render.
    4. This is also a good place to do network requests as long as you compare the current 
    props to previous props (e.g. a network request may not be necessary if the props have 
    not changed).

    useEffect with [something] dependency.

***unMounting***
- ***componentWillUnmount()***
    1. method is invoked immediately before a component is unmount or distroyed
    2. can perfrom clean up task.
        1. cancelling network request.
        2. removing event handlers
        3. cancelling subscriptions
        4. invalidating timers.

    return statement in useEffect 
    useEffect(()=>{
        return() => {
            // to do
        }
    })
        

- ***Error Handling***-  (Feedback)
    - called when there is an error either during rendering, in a lifecycle method or in 
    the constructor of any child component
***this methods are used to implement the error boundries for react application.***
    A class component becomes an error boundries by defining either or both of
    getDerivedStateFromError and componentDidCatch lifecycle methods.
    ***if there is error we will return fallback ui.***
    ***else we will return this.props.children refers to the component we are actually rendering***

- ***static getDerivedStateFromError(error)***
    1. it will try to execute just before the render method. and here you will be the ideal place to update the state.
    2. it is used to render fallback ui after an error is thrown.

    side effect are not permitted in this method.

- ***componentDidCatch(error, info)***
    1. it will fire after completely completing rendering of the component.
    The componentDidCatch() method is invoked if some error occurs during the rendering phase of any lifecycle methods or any children components. 
    why?
        1. In order to log any error.
        2. log any error into database or if you want to sent it serverside.

    can cause side effect.
    
    In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.

    You can wrap top level route components, you might also wrap components that might contain obscure code. Its up to you how to best handle protecting against application crashes.

    In the event of an error, your error boundary's getDerivedStateFromError() method will first be called (to update state), then the render() method (to actually render the fallback UI), and then componentDidCatch (once the fallback UI has been committed to the DOM).
    
    componentDidCatch() only works for catching errors thrown by a components children.

    On production, instead, the errors will not bubble up, which means any ancestor error handler will only receive errors not explicitly caught by componentDidCatch().

- ***Anonymous functions -***
    Anonymous functions are functions without names.
    Anonymous functions can be used as an argument to other functions or as an immediately invoked function execution.
    In this example, we pass an anonymous function into the setTimeout() function.
        setTimeout(function() {
            console.log('Execute later after 1 second')
        }, 1000);

    If you want to create a function and execute it immediately after the declaration, you can declare an anonymous function like this:
        (function() {
            console.log('IIFE');
        })();
    it is used for temporary use.
    it is used for one time use.

- ***Regular component - >***
    does not implement shouldComponentUpdate method. It returns always true by default.

- ***Pure component - > (Feedback)***
    ***we can create component by extending PureComponent class.***
    A pure component on the other hand implement shouldComponentUpdate with a shallow props and state comparision.
    If there is no difference component is not re-rendered.

    Prevents re-rendering of Component if props or state is the same
    ***Takes care of “shouldComponentUpdate” implicitly***
    Pure Components are more performant in certain cases
    ***it does a shallow comparison on state change.***
   ***it means that when comparing scaler values it compare their values, but when comparing object it compare only reference.***
    if you are using React.PureComponent you should make sure all child components are also pure.
    as same as React.memo()

    - ***It’s too risky for React to do a deep equality check since we might have really deeply nested data.***
    - ***A component with inline generated props will always re-render (like style={{width: 100%}}.***
    - ***PureComponent is only great with simple flat objects/props*** or by using something like ImmutableJS to detect changes in any object with a simple comparison. 
    - PureComponent prevents re-renders if the props and state don't change, but it doesn't know which props and state are necessary and which aren't. If the state or props change, but the output of the render method is the same, you still have an unnecessary re-render.
    - Failing to re-render due to mutating props or state
        PureComponent prevents re-renders if the props and state don’t change, but it doesn’t know which props and state are necessary and which aren’t. If the state or props change, but the output of the render method is the same, you still have an unnecessary re-render.

- ***Funtional Component - >*** 
    Funtional Component are just***javascript function***
    they can***optionally receive an object of properties***which is***referred to as props***
    and return HTML JSX which describe UI.
     
    Functional component are used when the component have from***zero to minimal state management***.
    class component densely supports state manangement. 
    It can manage complex state object.


- ***Hooks***- 
    - let we use state and other React features without writing a class.
    - React provides a few built-in Hooks like useState.
    - Hooks don't work inside classes — they let you use React without classes. 
    - With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. 
    - Since React v0.14.0, we've had two ways to create components - classes or functions. The difference was that ***if our component had state*** or ***needed to utilize a lifecycle method***, we had to use a class. Otherwise, if it just accepted props and rendered some UI, we could use a function.

- ***we need to understand why functional components were introduced to replace the class component?***
    1. ***It is hard to reuse stateful logic between components in the class component.***
        Complex components are hard to understand in the class component.
        Class confuses both people and machines.
    2. ***No need for unnecessary method binding like we kalways do in the class component.***
        Sharing stateful logic between components is tedious in a class- based approach.
    3. Functional components with hooks are concise and more straightforward to code with. 
        They perform exactly as the  class component; this implies no difference between the two other than syntax.
    4. By using just functional components in your project, you drastically eliminate the need to 
        refactor the class component into a functional component when it grows.
    5. ***Since classes confuse both people and machines, most especially the this keyword***, we don’t have to worry about this anymore in functional components.
   

- ***useState***
***The useState() hook allows React developers to update, handle and manipulate state inside functional components.***
    useState is a new way to use the exact same capabilities that this.state provides in a class.
***It accepts an argument as the initial value of the state.***
***It returns a pair of values: the current state and a function that updates it.***
    This is similar to this.state.count and this.setState in a class
    

- ***useEffect***
***The Effect Hook lets you perform side effects in function components***
    Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects
***By using this Hook, we tell React that your component needs to do something after render***. 

    - ***For Example***
    function Example() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        document.title = `You clicked ${count} times`;
      });
    }

- ***React.memo()***
    - ***React.memo() is a higher- order component (HOC)***
        that we can use to wrap components 
        that we do not want to re-render    
    ***unless props within them change***
    - ***it avoid unnecessary renderings.***
    - ***Use it when your component often renders with the same props.***
    - ***This happens, When the parent component renders, child components are forced to re-render with the same props.***

    1. functional component will re-render everytime the parent renders if no matter 
        if the props have changed or not.
    2. however, using react- memo HOC it is actually possible for functional component to get same 
        shouldComponentUpdate.


- ***useMemo***
    - ***The primary purpose of useMemo hook is "performance optimization".***

    - ***It returns a memoized value,***
    It accepts two arguments -  create function (which should return a value to be memoized) and dependency array. It will recompute the memoized value only when one of the dependencies has changed.

    useMemo is a React Hook that lets you cache the result of a calculation between re-renders.

    **During subsequent renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call function again, and return the result that function has returned.**

    - Usage 
        - Skipping expensive recalculations
        - Skipping re-rendering of components 
        - Memoizing a dependency of another Hook
        - Memoizing a function

    - // shouldComponentUpdate 
        By default, it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

        import React from 'react'
        function areEqual(prevProps, nextProps) {
          /*
          return true if passing nextProps to render would return
          the same result as passing prevProps to render,
          otherwise return false
          */
        }
        const Weather = ({weather}) => {
            return (<div>
                     <p>{weather.city}</p>
                     <p>{weather.temperature}</p>
                     {console.log('Render')}
                    </div>
            )
        }

        export default React.memo(Weather, areEqual)

- ***useCallback***
    - ***useCallback is a lets you cache a function definition between re-renders.***

    - Usage
        - Skipping re-rendering of components
        - Updating state from a memoized callback
        - Preventing an Effect from firing too often
        - Optimizing a custom Hook

    - ***Only worth it when you are passing down the method as a prop to another component,*** or the method itself needs to be preserved and ***not recreated at every render.*** 

    - Typically useCallback is helpful ***when passing callback props to highly optimised child components.***
    - For example, if a child component that accepts a callback relies on a referential equality check (eg: React.memo() or shouldComponentUpdate) to prevent unnecessary re-renders when its props change, then it is important that any callback props do not change between renders.


usememo is componenent specific whereas usecallback is function specific
- ***useReducer***
    - The useReducer Hook is the better alternative to the useState hook
    - why?
        - ***when we have complex state-building logic*** or when the next state value depends upon its previous value or when the components are needed to be optimized
    - you call the hook with two arguments. The first one is a function called a reducer, and the second one is the initial state.
    - useReducer hook returns two things: the state, and a function called dispatch. This is pretty similar to useState, which also returns the state and a function to modify the state.
    - In useReducer you pass an action to the dispatch function.

    The initialState variable
    This is the default value of our component’s state when it gets mounted for the first time inside the application.

    The reducer function
    The next step is to update the component’s state when some actions occur. This function tells what the state should contain depending on the action.

    - Example
        import { useReducer } from 'react';

        const initialState = { count: 0 };

        function reducer(state, action) {
          switch (action.type) {
            case 'increment':
              return { count: state.count + 1 };
            case 'decrement':
              return { count: state.count - 1 };
            default:
              throw new Error();
          }
        }

        function MyComponent() {
          const [state, dispatch] = useReducer(reducer, initialState);

          return (
            <div>
              <p>Count: {state.count}</p>
              <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
              <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
            </div>
          );
        }

- ***ref ***
    
    - A ref is a plain JavaScript object with a single property called current, which you can read or set.
    - When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.
    - We can use refs when managing focus, text selection, media playback, scorilling effect and triggering animation.
    - A ref can be created in two ways- by the useRef hook or by the createRef function. 
    - Usage
        - Storing timeout IDs
        - Storing and manipulating DOM elements
        - Storing other objects that aren’t necessary to calculate the JSX.
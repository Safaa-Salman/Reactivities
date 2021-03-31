//npm install uuid for create guid be careful to install it in client-app
//npm install mobx mobx-react-lite in cd client-app; note that i am installing both mobX and mobX-react-lite if i do not want to use observer i can only install mobX
//we are usinng mobX because it is simple to use and written in type script
//npm install react-router-dom
//npm install @types/react-router-dom --save-dev

// export default class ActivityStore {
//     title = 'Hello from MobX!';

//     constructor() {
//         makeObservable(this, {
//             title:observable,
//             setTitle: action.bound
//         })
//     }

//     setTitle() {
//         this.title = this.title + '!';
//     }
// }
//here i am using a normal function that is why i need to bound the function to the class using "bound" so i can use title in it
//alternatively i can use an arrow function which is already bound to the class 
// plus
// ican use makeObservable but i will have to specify like above however if i use makeAutoObservable and just write this and MobXis going to work out that title is a property therefore it should be and Observable and setTitle is a function therefore it is an action
//Like this
// export default class ActivityStore {
//     title = 'Hello from MobX!';

//     constructor() {
//         makeAutoObservable(this)
//     }

//     setTitle = () => {
//         this.title = this.title + '!';
//     }
// }

//In MobX every "tick" (step that update an observable) should be marked as action. But any steps after await aren't in the same tick, so they require action wrapping, to fix that you can use runInAction
//So Here:(small notes before procceding)
            //in async await everything async is inside try catch
            //you can use Promises it is a preference
            //in Redux this would not work because Redux is an unmutable state maneger (here i am pushing in the activities) but it is fine in MobX
//    loadActivities = async () => {
//     this.loadingInitial = true;
//     try{
//         const activities = await agent.Activities.list();
//         runInAction (() => {
//             activities.forEach(activity => {
//                 activity.date = activity.date.split('T')[0];
//                 this.activities.push(activity);
//               })
//               this.loadingInitial = false;
//         })
//     }catch (error){
//         console.error();
//         runInAction(() => {
//             this.loadingInitial = false;
//         })
//     }
// } 
//loadinginitial is an observable that is changing but since it is after await it wasn't in the tick and I was given a warning that loadingInitial should be action wrapped so i wrapped it in runInAction
//But an alternative aproach is to make the setting of the loading into an action by making it a function on it's own; so because the change of state is happening inside it's own action we don't need to wrap it
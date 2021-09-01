//dotnet --info
//dotnet -h
//dotnet new -l
//mkdir Reactivities
//cd Reactivities
//creating the projects in the command Prompt
//dotnet new sln :Multiplte projects --> solution file as a container
//dotnet new webapi -n API :Starter Projects, the project that runs the application
//Supporting projects
//dotnet new classlib -n Application
//dotnet new classlib -n Domain
//dotnet new classlib -n Persistence
//dir

//Add the projects to the solution:
//dotnet sln add API/API.csproj
//dotnet sln add Application
//dotnet sln add Domain
//dotnet sln add Persistence
//dotnet sln list

//API has dependency on Application
//cd API 
//dotnet add reference ../Application

//Application has dependency on Domain and Persistence
//cd ..
//cd Application
//dotnet add reference ../Domain
//dotnet add reference ../Persistence

//Persistence has dependency on Domain 
//cd ..
//cd Persistence
//dotnet add reference ../Domain

//Packages used:
//cd project
//dotnet list package

//npx create-react-app client-app --use-npm --template typescript
//npm install semantic-ui-react semantic-ui-css
//npm install axios
//npm install uuid for create guid be careful to install it in client-app
//npm install mobx mobx-react-lite in cd client-app; note that i am installing both mobX and mobX-react-lite if i do not want to use observer i can only install mobX
//we are usinng mobX because it is simple to use and written in type script
//npm install react-router-dom
//npm install @types/react-router-dom --save-dev
//npm install react-calendar
//npm install @types/react-calendar
//npm install react-toastify
//npm install --save history
//npm install --save @types/history
//dotnet ef database drop -s API -p Persistence  :restart server and drop database
//npm install yup :in cd client-app: it is not written in type script we should add: npm install @types/yup --save-dev
//dotnet restore: if you install new nuget packet and quick fix is not recognizing it  

//For the forms: formik.org  ---> npm install formik in cd client-app
//For datepickers: https://reactdatepicker.com/  --> npm install react-datepicker if you get error about "unable to resolve depenancy" then you can use: npm install react-datepicker --legacy-peer-deps and datepicker is not written in type script so we write: npm install @types/react-datepicker --save-dev
// To fix the string/date type issue we use fns https://date-fns.org/ --> npm install date-fns@2.22.1 (you write npm ls date-fns and install the version  given )
// For uploading images we are using react dropzone --> https://react-dropzone.js.org/ ---> npm install --save react-dropzone
// To crop images we are using react cropper --> https://www.npmjs.com/package/react-cropper ---> npm install --save react-cropper

//install SignalR on API it is already in microsoft no need ; but in client-app you should install it by --> npm install @microsoft/signalr (in cd client-app) (already in typescript since microsoft created typescript)

//dotnet new gitignore --> create new gitignore file

//for migrations: dotnet tool list --global  to see the version 
//if it is out of date dotnet tool update --global dotnet-ef
//Note that ef tool version must me same as runtime if not update by the above
//dotnet ef -h (you will see migrations DbContext and datbase, we will do migration then fill the databse)
// IMPORTANT!!!!!!!!
// whenever we make new migration we should turn off our .net server
// in the solution (no cd) we write
// dotnet ef migrations add IdentityAdded -p Persistence -s API
//                          name           where          flag to starter project
//to undo migration ef migrations remove

//after the first migration you should create the database:
//dotnet ef database -h  (update or drop)
//The update creates or updates depending on whenever or not there is a database, Howhever i did not use this and i changed Program.cs
//So after changing the Program.cs i run the application 

// jwt.io --> decode the token to test if everything is alright
//For storages of secrets of the app you can either use appsettings.json() without publiching to gitHub or take a look at https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows
//Note: for things that you do not care if someone saw them you put it in appsettings.Development.json() (appsettings.Development.json() is only used in development)


//To create the the infrastructure project we write in the terminal:
//dotnet new classlib -n Infrastructure
//dotnet sln add Infrastructure
//cd Infrastructure
//dotnet add reference ../Application    (Infrastructure has dependency on Appliaction)
//cd ..
//cd API
//dotnet add reference ../Infrastucture   (API has dependency on Infrastructure)
//cd ..
//dotnet restore         (so that everyone is aware of these dependencies)


//Loading related entities documentation: https://docs.microsoft.com/en-us/ef/ef6/querying/related-data

//Whenever i change the seeds; i drop the database and restart my app:
//in the main folder
//dotnet ef database drop -p Persistence -s API
//y
//cd API 
//dotnet watch run (this will reseed our database)

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

//axios.interceptors.response.use(async response => {
//     try {
//         await sleep(1000);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return await Promise.reject(error);
//     }
// })
//interceptor before changing it and usingthe toastify
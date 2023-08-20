<template>
  <div>
   <div class=' col-md-12' style='text-align:right'>

  <div class="input-group col-md-6" style='margin-left:50%;'>
        <input
          type="search"
          v-model="searchTerm"
          class="form-control rounded"
          placeholder="Search by title"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button type="button" class="btn btn-primary" style="height: 38px">Search</button>
      </div>

   </div>
    <div class="row">

      <div class="col-md-12 mx-auto">
        <form @submit.prevent="addTodo()">

          <div class="form-group mx-sm-3 mb-2 col-md-4">
            <label for="projectName" class="test_text">Add Task</label>
             <input
          type="text"
          v-model="forms.todo"
          class="form-control rounded"
          placeholder="Task Title.."

          aria-describedby="search-addon"
        />
          </div>


          <div class="form-group mx-sm-3 mb-2 col-md-4 btn_holder">
                     <button type="submit" class="btn btn-primary mb-2">Add</button>

          </div>
        </form>
      </div>
       <table class="table test_text">
      <thead>
        <tr>
          <th>Sl </th>
          <th>Task Title</th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo,index) in filterSearch">
          <td>{{ index+1 }}</td>
          <td>{{ todo.todo }}</td>


          <td class="remove_bg_td">

            <button class="btn" @click="deleteTask(todo.id)">
              <i class="fa fa-trash "></i>
            </button>
          </td>
        </tr>

        <!-- add more rows as needed -->
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "todo",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // Access the $router property here
      if (!User.hasLoggedIn()) {
        vm.$router.push({ name: "home" });
      } else {
        vm.$router.push({ name: "todo" });
      }
    });
  },
  data() {
    return {
        forms:{
          todo:"",
        },
        todos:[],
        searchTerm:"",
    };
  },
  created() {
        axios
        .get('/api/todo')
        .then((res) => {
          this.todos = res.data;
          console.log(res.data);
        })
        .catch((error) => {
        });


  },
  methods: {
    addTodo() {

      axios
        .post("/api/todo", this.forms, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          location.reload();
        })
        .catch((error) => {
          this.errors = JSON.parse(error.response.data);
        });
    },
     deleteTask($id){
        axios.delete('/api/todo/'+$id).then((res)=>{
            location.reload();
        }).catch((err)=>{
            console.log(err.response);
        })
    },
  },
  computed: {
    filterSearch() {
      return this.todos.filter((todo) => {
        const search_Term = this.searchTerm.toLowerCase();
        const typeName = todo.todo.toLowerCase();
        return typeName.match(search_Term);
      });
    },
  },
};
</script>
<style>
    .test_text{
        font-size:1.2em;
        color:#4e3089;
        font-weight:bold;
    }
    .btn_holder{
        align-items:right;
    }
    .test_title{
        color:#605ca8!important;
    }
    .fa-trash{
        color:red;
    }
</style>

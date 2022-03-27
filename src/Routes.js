import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import CreateStudent from "./Students/CreateStudent";
import Students from "./Students/Students";
import { StudentsProvider } from "./StudentsContext";

const Routes = () => {
  return (
    <div>
      <StudentsProvider>
        <Switch>
          <Route path="/" exact component={Students} />
          <Route path="/add-student" exact component={CreateStudent} />
          <Route path="/student/edit/:id" exact component={CreateStudent} />
        </Switch>
      </StudentsProvider>
    </div>
  );
};

export default Routes;

import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";

console.log(
  ` _____ ______ ______ __   __ _____   ___
|  _  || ___ \\| ___ \\\\ \\ / /|_   _| / _ \\
| | | || |_/ /| |_/ / \\ V /   | |  / /_\\ \\
| | | ||    / | ___ \\  \\ /    | |  |  _  |
\\ \\_/ /| |\\ \\ | |_/ /  | |    | |  | | | |
 \\___/ \\_| \\_|\\____/   \\_/    \\_/  \\_| |_/
%c                     .::.
                  .:'  .:
        ,MMM8&&&.:'   .:'
       MMMMM88&&&&  .:'
      MMMMM88&&&&&&:'
      MMMMM88&&&&&&
    .:MMMMM88&&&&&&
  .:'  MMMMM88&&&&
.:'   .:'MMM8&&&'
:'  .:'
'::'`,
  "color: blue",
);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

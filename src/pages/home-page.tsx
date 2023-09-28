export const HomePage = () => {
  return (
    <div className="home-page" style={{ padding: '1.5rem' }}>
      <h1 className="center-text disable-selection">Home Page</h1>
      <h3>
        Welcome to my very minimalistic-looking little project called "Todo
        App".
      </h3>
      <p>
        In this project, you can create TodoGroups where you can put your tasks,
        but you can use it as a note app too, where you just put your notes.
        <br /> (I use it to store my cooking recipes too 😁)
      </p>
      <p>In the next few points, I will explain how this app works.</p>
      <h3>Basics</h3>
      <ul>
        <li>
          There are 2 main sides of the page: the Navbar and the Main area.
        </li>
        <li>
          Your data (todoGroups, and the tasks) are saved in the localStorage,
          so if you download the source code you can use this app offline too.
        </li>
        <li>
          So if you have data, it will load automatically. If you don't have
          any, then it will load the default data. (with 1 example todoGroup)
        </li>
      </ul>
      <h3>Navbar</h3>
      <ul>
        <li>
          On the Navbar, there is the Home button and below it, you can see your
          TodoGroups.
        </li>
        <li>
          Below the list, there is a todoGroup creator form. You can use it if
          you want to create one. <br />
          (limit: 15)
        </li>
      </ul>
      <h3>Main area</h3>
      <ul>
        <li>
          In the main area, you can view the pages. (Home, tasks of the
          TodoGroups, and the error page)
        </li>
        <li>
          Below the title, you can see the list of the Tasks of the TodoGroup.
        </li>
        <li>
          Below that you can see 2 buttons, the create Task and the Remove
          group. I think this part is obvious.
        </li>
        <li>
          The limit for the Tasks is 20. (I couldn't figure out how to manage
          the tabIndex with an infinite amount. Sorry :D )
        </li>
      </ul>
      <h3>Tasks</h3>
      <ul>
        <li>A task has 3 main properties: Status, title, and description.</li>
        <li>
          The status (the box on the right side of the title) has 3 colors.
          (gray = not started, orange = in progress, green = done)
        </li>
        <li>
          You can click on the status (on focus just press enter) to switch
          between these statuses.
        </li>
        <li>If you click on the title-bar, the description will be toggled.</li>
        <li>
          Under that, there are 4 buttons, which you can control the task.
        </li>
      </ul>
      <h3>Features</h3>
      <ul>
        <li>
          On PC you can use this app with a keyboard <br /> (tab = next,
          shift+tab = previous, enter = apply or use, escape = leave or cancel)
        </li>
      </ul>
    </div>
  );
};

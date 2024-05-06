export const HomePage = () => {
  return (
    <div className="home-page" style={{ padding: "1.5rem" }}>
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
          you want to create one.
        </li>
        <li>
          On the bottom of the navbar, you can the Settings button, which leads
          you to the Settings page, where you can change the theme or
          import/export or even clean your data.
        </li>
      </ul>
      <h3>Main area</h3>
      <ul>
        <li>
          In the main area (where you are reading right now), you can view the
          pages. (Home, tasks of the TodoGroups, and the error page)
        </li>
        <li>
          Below the title, you can see the list of the Tasks of the TodoGroup.
        </li>
        <li>
          Below that you can see 2 buttons, the create Task and the Remove
          group. I think this part is obvious.
        </li>
        <li>
          The limit for the Tasks is theoratically infinite, but it's not
          because of the limitations of the localStorage (commonly 5MB), I tried
          to compress the long attribute names to save some storage, so don't
          expect to edit your save file, because it's hard to read.
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
          between these statuses. (shift+enter is switching backwards)
        </li>
        <li>If you click on the title-bar, the description will be toggled.</li>
        <li>
          Under that, there are 4 buttons, which you can control the task. (on
          focus, you can use arrow buttons)
        </li>
      </ul>
      <h3>GOOD TO KNOW</h3>
      <ul>
        <li>There are limits on how many lines you can write in a task.</li>
        <li>Title: 5 lines</li>
        <li>Description: 10 lines</li>
      </ul>
      <h3>Features</h3>
      <ul>
        <li>
          On PC you can use this app with a keyboard <br /> (tab = next,
          shift+tab = previous, enter = apply or use, shift+enter switch status
          backwards)
        </li>
        <li>
          Good to know: Select boxes (like sorting or changing theme), can be
          used with left and right keys (not with enter).
        </li>
      </ul>

      <h3>Never tested features</h3>
      <ul>
        <li>
          I store these data in the localStorage and I know that it has a limit,
          but I have never tested that.
        </li>
        <li>Try not to exceed it 😛</li>
      </ul>
    </div>
  );
};

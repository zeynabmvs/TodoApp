updateCount();
console.log(localStorage.getItem('colorMode'));

// Function to count uncompleted items
function updateCount(jQuery) {
    let count = $(".all_tasks .active").length;
    $(".items_count").html(count + " items left")
}


// Click on X to delete the task item
$(".all_tasks").on('click', ".delete_btn", function (e) {
    e.stopPropagation();
    $(this).closest(".task").fadeOut(400, function () {
        $(this).remove();
        updateCount();
    });
});

// Click on clear completed button to Delete all completed tasks 
$(".clear_btn").click(function () {
    console.log("clear btn");
    $(".task.checked").fadeOut(400, function () {
        $(this).remove();
    });
});

// click on the filter options to filter tasks by: all, active, completed
$("#showAll").click(function () {
    $(".task").show();
});

$("#showActive").click(function () {
    $(".task.checked").hide();
    $(".task.active").show();
});

$("#showCompleted").click(function () {
    $(".task.active").hide();
    $(".task.checked").show();
});

//Add new todos
$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
        //grab text
        var todoText = $(this).val();
        //append todotext to ul

        const newTaskHtml = '<div class="task item active"><input class="checkbox" type="checkbox" maxlength="200"/><p>' + todoText + '</p><button class="delete_btn"><img src="/images/icon-cross.svg" alt="Delete task"></button></div>';

        if ($(this).val() !== "") {
            $(".all_tasks").append(newTaskHtml);
        }
        updateCount();
        //clear text
        $(this).val("");
    }
});

// Check off Specific task By Clicking
$(".all_tasks").on("click", ".task", function () {
    const task = $(this)
    const checkbox = (this).children('.checkbox').prop("checked", true);
    $(this).toggleClass("active checked");
});


// $(".all_tasks").on("change", ".checkbox", function () {
//     console.log(this);
//     console.log(this.checked);

//     if(this.checked) {
//         $(this).parent().toggleclass("active checked");

//         // $(this).parent().find('.task').toggleclass("active checked");
//     }
// });

// console.log(localStorage.getItem('colorMode'));


const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

const setDarkMode = () => {
  document.querySelector('body').classList = 'dark';
  localStorage.setItem('colorMode', 'dark');
};

const setLightMode = () => {
  document.querySelector('body').classList = 'light';
  localStorage.setItem('colorMode', 'light');
};

const colorModeFromLocalStorage = () => {
  return localStorage.getItem('colorMode');
};

const colorModeFromPreferences = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
              ? 'dark'
              : 'light' // If preference is set or does not match anything (light is default)
};

const loadAndUpdateColor = () => {
  // local storage has precendence over the prefers-color-scheme
  const color = colorModeFromLocalStorage() || colorModeFromPreferences();

  
  color == 'dark' ? darkButton.click() : lightButton.click();
};

// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        event.matches ? darkButton.click() : lightButton.click();
      });
      
// Load the right color on startup - localStorage has precedence
loadAndUpdateColor();
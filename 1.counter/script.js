// 1. Counter state and display
const theme_toggle= document.querySelector(".theme_toggle");
theme_toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark_mode')
})
let counter = 0;
let subtract_next = false;

const number_box = document.querySelector(".number_box");
number_box.textContent = counter;

// Add a signed amount and show the new total.
// A positive amount adds to the counter. A negative amount subtracts.
function update_counter(amount) {
  counter += amount;
  number_box.textContent = counter;
}

// 2. Start from a number
const number_input = document.querySelector(".number_input");
const enter = document.querySelector(".enter");

// Set the counter directly to the number in the input.
enter.addEventListener("click", () => {
  counter = Number(number_input.value);
  number_box.textContent = Number(number_input.value);
});

// 3. Quick action buttons
const p_one = document.querySelector(".p_one");
const p_two = document.querySelector(".p_two");
const p_three = document.querySelector(".p_three");
const p_four = document.querySelector(".p_four");
const p_five = document.querySelector(".p_five");

const m_one = document.querySelector(".m_one");
const m_two = document.querySelector(".m_two");
const m_three = document.querySelector(".m_three");
const m_four = document.querySelector(".m_four");
const m_five = document.querySelector(".m_five");

p_one.addEventListener("click", () => {
  update_counter(1);
});

p_two.addEventListener("click", () => {
  update_counter(2);
});

p_three.addEventListener("click", () => {
  update_counter(3);
});

p_four.addEventListener("click", () => {
  update_counter(4);
});

p_five.addEventListener("click", () => {
  update_counter(5);
});

m_one.addEventListener("click", () => {
  update_counter(-1);
});

m_two.addEventListener("click", () => {
  update_counter(-2);
});

m_three.addEventListener("click", () => {
  update_counter(-3);
});

m_four.addEventListener("click", () => {
  update_counter(-4);
});

m_five.addEventListener("click", () => {
  update_counter(-5);
});

// 4. Add or subtract an entered number
const specific_number = document.querySelector(".specific_number");
const plus_entered_number = document.querySelector(".plus_entered_number");
const minus_entered_number = document.querySelector(".minus_entered_number");

const plus_quick_actions = document.querySelector(".plus_quick_actions");
const minus_quick_actions = document.querySelector(".minus_quick_actions");

// Remember which custom buttons have been added.
// The sign lets the array tell +7 and -7 apart.
let new_buttons = [];

plus_entered_number.addEventListener("click", () => {
  if (specific_number.value === "") return;

  // Update the counter on every click, even if the button already exists.
  update_counter(Number(specific_number.value));

  let input_specific_number = Number(specific_number.value);
  if (new_buttons.includes(input_specific_number)) return;

  const new_button = document.createElement("button");
  new_button.textContent = `+${specific_number.value}`;
  new_button.addEventListener('click', ()=>{
    update_counter(input_specific_number)
  })
  plus_quick_actions.append(new_button);
  new_buttons.push(input_specific_number);
});

minus_entered_number.addEventListener("click", () => {
  if (specific_number.value === "") return;

  update_counter(-Number(specific_number.value));

  let input_specific_number = Number(specific_number.value);
  if (new_buttons.includes(-input_specific_number)) return;

  const new_button = document.createElement("button");
  new_button.textContent = `-${specific_number.value}`;
  new_button.addEventListener("click", () => {
    update_counter(input_specific_number);
  });
  minus_quick_actions.append(new_button);
  new_buttons.push(-input_specific_number);
});

// 5. Auto Mode
const auto_step_size = document.querySelector(".auto_step_size");
const auto_start = document.querySelector(".auto_start");
const auto_pause = document.querySelector(".auto_pause");
const auto_subtract = document.getElementById("auto_subtract");

// null means no timer is running.
let auto_interval_id = null;

auto_start.addEventListener("click", () => {
  // A saved timer ID means Start has already been clicked.
  if (auto_interval_id !== null) {
    return;
  }

  if (auto_step_size.value === "") return;

  // Read the step size when Start is clicked.
  let step_size = Number(auto_step_size.value);

  // Check the direction every second so it can change while the timer runs.
  auto_interval_id = setInterval(() => {
    if (auto_subtract.checked) {
      update_counter(-step_size);
    } else {
      update_counter(step_size);
    }
  }, 1000);
});

auto_pause.addEventListener("click", () => {
  // Stop the timer and let Start create a new one later.
  clearInterval(auto_interval_id);
  auto_interval_id = null;
});

// 6. Keyboard shortcuts
const allowed_keys = ["1", "2", "3", "4", "5"];

document.addEventListener("keydown", (event) => {
  // In the starting-number input, Enter sets the counter.
  if (event.target === number_input) {
    if (number_input.value === "") {
      return;
    }

    if (event.key === "Enter") {
      counter = Number(number_input.value);
      number_box.textContent = Number(number_input.value);
    }

    return;
  }

  // Skip shortcuts while the user types in either of these inputs.
  if (event.target === specific_number) {
    return;
  }

  if (event.target === auto_step_size) {
    return;
  }

  // Remember the minus sign for the next allowed number key.
  if (event.key === "-") {
    subtract_next = true;
    return;
  }

  // includes() checks whether the pressed key is in the allowed list.
  if (allowed_keys.includes(event.key)) {
    const amount = Number(event.key);

    if (subtract_next === true) {
      update_counter(-amount);
    } else {
      update_counter(amount);
    }

    // The minus sign applies to one number only.
    subtract_next = false;
  }
});

// 7. Reset
const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
  // Stop Auto Mode before setting the counter back to zero.
  clearInterval(auto_interval_id);
  auto_interval_id = null;
  counter = 0;
  number_box.textContent = counter;
});
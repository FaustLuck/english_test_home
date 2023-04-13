import { afterEach, beforeEach, describe, expect } from "vitest";
import Tool from "@/stories/Tool.vue";
import { mountWrapper } from "../mountWithVuetify";
import { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { useSettingsStore } from "../../src/store/settings";
import { Dictionary } from "../../src/types/settings";

function createDictionary() {
  let output: Dictionary = {};
  ["easy", "medium", "hard"].forEach(el => {
    output[el] = [];
    for (let i = 0; i < 5; i++) {
      output[el].push({ question: `q${i}`, answer: `a${i}` });
    }
  });
  return output;
}

const initialState = {
  settings: {
    dictionary: createDictionary()
  }
};

const props = {
  difficult: "easy",
  index: 0,
};

describe("Tool", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mountWrapper({ component: Tool, props }, initialState);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  function getButton(title: string) {
    return wrapper.find(`[title*="${title}"]`);
  }

  function checkVisible(done: number, undo: number, edit: number, del: number) {
    const titles = ["Готово", "Отменить", "Редактировать", "Удалить"];

    titles.forEach((title, i) => {
      let btnStyle = getButton(title).attributes("style") ?? "";
      expect(btnStyle.search("none") === -1).toBe(Boolean(arguments[i]));
    });
  }

  test("Проверка отрисовки", async () => {
    // wrapper = mountWrapper({ component: Tool, props }, initialState);

    console.log(wrapper.html());
    const buttons = wrapper.findAll(`[title]`);
    expect(buttons.length).toBe(4);
    checkVisible(0, 0, 1, 1);
  });

  test("Редактирование и последующее закрепление", async () => {
    const editButton = getButton("Редактировать");
    await editButton.trigger("click");
    await nextTick();
    expect(useSettingsStore().editingIndex).toBe(props.index);
    expect(useSettingsStore().editingDifficult).toBe(props.difficult);
    checkVisible(1, 0, 0, 0);
    const doneButton = getButton("Готово");
    await doneButton.trigger("click");
    await nextTick();
    expect(useSettingsStore().editingIndex).toBe(-1);
    expect(useSettingsStore().editingDifficult).toBe("");
  });

  test("Нажатие кнопки удалить", async () => {
    const delButton = getButton("Удалить");
    await delButton.trigger("click");
    await nextTick();
    const deletedItem = useSettingsStore().dictionary[props.difficult][props.index];
    expect(deletedItem.excluded).toBe(true);
    await wrapper.setProps({ excluded: deletedItem.excluded });
    checkVisible(0, 1, 0, 0);
  });

  test("Проверка отрисовки, если запись была отредактирована", async () => {
    await wrapper.setProps({ edited: true });
    checkVisible(0, 1, 1, 1);
  });

  test("Проверка отрисовки, если была добавлена новая запись", async () => {
    await wrapper.setProps({ included: true });
    checkVisible(0, 1, 1, 1);
  });

  test("Последовательное удаление изменений редактирования", async () => {
    const undoButton = getButton("Отменить");
    const targetRecord = useSettingsStore().dictionary[props.difficult][props.index];
    targetRecord.edited = true;
    targetRecord.excluded = true;
    targetRecord.oldAnswer = targetRecord.answer;
    targetRecord.oldQuestion = targetRecord.question;
    await wrapper.setProps({ edited: true, excluded: true });
    await undoButton.trigger("click");
    expect(targetRecord.excluded).toBeUndefined();
    await wrapper.setProps({ excluded: false });
    await undoButton.trigger("click");
    expect(targetRecord.oldAnswer).toBeUndefined();
    expect(targetRecord.oldQuestion).toBeUndefined();
    expect(targetRecord.edited).toBeUndefined();
  });

  test("Если запись новая, то нажатие кнопки удалит ее", async () => {
    const undoButton = getButton("Отменить");
    let targetRecord = useSettingsStore().dictionary[props.difficult][props.index];
    targetRecord.included = true;
    const { question, answer } = targetRecord;
    await wrapper.setProps({ included: true });
    await undoButton.trigger("click");
    targetRecord = useSettingsStore().dictionary[props.difficult][props.index];
    expect(targetRecord.answer).not.toBe(answer);
    expect(targetRecord.question).not.toBe(question);
  });

});
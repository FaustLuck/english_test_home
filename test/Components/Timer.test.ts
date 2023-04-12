import { afterEach, beforeEach, describe, expect } from "vitest";
import Timer from "@/stories/Timer.vue";
import { createWrapper } from "../mountWithVuetify";
import { VueWrapper } from "@vue/test-utils";
import { useTestStore } from "../../src/store/test";
import { nextTick } from "vue";

describe("Timer", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.useRealTimers();
  });

  test("Секунды правильно переводятся в формат мм:сс", async () => {
    wrapper = createWrapper({component: Timer }, { test: { timer: 65 } });
    await nextTick()
    expect(wrapper.findAll(`[text="1:04"]`).length).toBe(0);
    expect(wrapper.findAll(`[text="1:05"]`).length).toBe(1);
  });

  test("При монтировании таймера в pinia записывается его ID", async () => {
    wrapper = createWrapper({component: Timer }, { test: { timer: 10 } });
    await nextTick();
    expect(useTestStore().timerID).not.toBeUndefined();
    expect(useTestStore().timeLeft).toBe(10);
  });

  test("Обновление оставшегося времени происходит каждую секунду", async () => {
    wrapper = createWrapper({component: Timer }, { test: { timer: 10 } });
    vi.advanceTimersByTime(2 * 1000);
    await nextTick();
    expect(useTestStore().timeLeft).toBe(8);

    vi.advanceTimersByTime(5 * 1000);
    await nextTick();
    expect(useTestStore().timeLeft).toBe(3);
  });
});
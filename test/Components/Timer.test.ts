import Timer from "@/stories/Timer.vue";
import { mountWrapper } from "../mountWithVuetify";
import { VueWrapper } from "@vue/test-utils";
import { useTestStore } from "@/store/test";
import { nextTick } from "vue";

const component = Timer;
describe("Timer", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("Секунды правильно переводятся в формат мм:сс", async () => {
    wrapper = mountWrapper({ component }, { test: { timer: 65 } });
    await nextTick();
    expect(wrapper.text().search("1:04") > -1).toBe(false);
    expect(wrapper.text().search("1:05") > -1).toBe(true);
  });

  test("При монтировании таймера в pinia записывается его ID", async () => {
    wrapper = mountWrapper({ component }, { test: { timer: 10 } });
    await nextTick();
    expect(useTestStore().timerID).not.toBeUndefined();
    expect(useTestStore().timeLeft).toBe(10);
  });

  test("Обновление оставшегося времени происходит каждую секунду", async () => {
    wrapper = mountWrapper({ component }, { test: { timer: 10 } });
    await nextTick();
    vi.advanceTimersByTime(2 * 1000);
    await nextTick();
    expect(useTestStore().timeLeft).toBe(8);

    vi.advanceTimersByTime(5 * 1000);
    await nextTick();
    expect(useTestStore().timeLeft).toBe(3);
  });

  test("Когда время закончилось, очищает данные в хранилище, после 3-секундного ожидания меняет статус теста", async () => {
    wrapper = mountWrapper({ component }, { test: { timer: 2, isTesting: true } });
    await nextTick();
    vi.advanceTimersByTime(2 * 1000);
    await nextTick();
    expect(useTestStore().timerID).toBe(0);
    expect(useTestStore().isTesting).toBe(true);
    vi.advanceTimersByTime(3 * 1000);
    await nextTick();
    expect(useTestStore().isTesting).toBe(false);
  });
});
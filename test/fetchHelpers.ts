export function fetchHelperGet() {
  return vi.fn()
    .mockReturnValue(Promise.resolve({
      ok: true,
      headers: {
        get: () => "application/json"
      },
      json: () => Promise.resolve({
        test: [{
          "question": "It",
          "answer": ["Оно", "Папа", "Пока", "Семь"],
          "difficult": "easy",
          "key": "l5z8bzmz9l08"
        }, {
          "question": "Thanks",
          "answer": ["Мама", "Один", "Папа", "Спасибо"],
          "difficult": "easy",
          "key": "yytfps3bafgy"
        }, {
          "question": "Good bye",
          "answer": ["Америка", "Где", "До свидания", "Твой, ваш"],
          "difficult": "easy",
          "key": "am8a5x0z7l7y"
        }, {
          "question": "Your",
          "answer": ["Восемь", "До свидания", "Пять", "Твой, ваш"],
          "difficult": "easy",
          "key": "5gg9okw672ak"
        }, {
          "question": "What is your name?",
          "answer": ["He is Vasya", "I am seven", "My name is Liza", "She is from America"],
          "difficult": "hard",
          "key": "q6s9me0hek8v"
        }]
      })
    }));
}
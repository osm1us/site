import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

const mockAI = (prompt) => {
  const responses = {
    'Проанализируй рыночные тренды в e-commerce за Q2.': 'Анализ завершен. Ключевые тренды: рост мобильной коммерции (+15%), персонализация на основе ИИ, популярность \'buy now, pay later\'.',
    'Сгенерируй 3 варианта рекламного слогана для SaaS-платформы.': '1. Ваш бизнес, усиленный ИИ. 2. Интеллектуальные решения для амбициозных задач. 3. Будущее аналитики. Сегодня.',
    'Напиши Python-скрипт для парсинга заголовков с новостного сайта.': 'Конечно. `import requests; from bs4 import BeautifulSoup; url = \'https://news.site\'; ...` скрипт сгенерирован.',
  };
  return responses[prompt] || 'Обработка запроса...';
};

const script = [
  'Проанализируй рыночные тренды в e-commerce за Q2.',
  'Сгенерируй 3 варианта рекламного слогана для SaaS-платформы.',
  'Напиши Python-скрипт для парсинга заголовков с новостного сайта.',
];

const Terminal = ({ isActive }) => {
  const [history, setHistory] = useState([]);
  const [scriptIndex, setScriptIndex] = useState(0);
  const timeoutRef = useRef(null);

  const runScript = () => {
    const userPrompt = script[scriptIndex];
    const aiResponse = mockAI(userPrompt);

    // Показываем команду пользователя и ответ ИИ
    setHistory(prev => [
      ...prev.slice(-4), // Ограничиваем историю, чтобы не переполнять
      { type: 'user', text: userPrompt },
      { type: 'ai', text: aiResponse },
    ]);

    // Переход к следующей команде в цикле
    setScriptIndex(prev => (prev + 1) % script.length);

    // Запускаем следующий цикл через некоторое время
    timeoutRef.current = setTimeout(runScript, 5000); // 5 секунд на пару вопрос-ответ
  };

  useEffect(() => {
    if (isActive) {
      // Начинаем с чистого листа и запускаем скрипт
      setHistory([]);
      setScriptIndex(0);
      // Небольшая задержка перед первым запуском для плавности
      timeoutRef.current = setTimeout(runScript, 500);
    } else {
      // При деактивации останавливаем и сбрасываем
      clearTimeout(timeoutRef.current);
      setHistory([]);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-dark-navy/50 font-mono text-xs text-light-slate overflow-hidden p-2 flex flex-col">
      <div className="flex flex-col gap-2">
        {history.map((line, index) => (
          <div key={index}>
            {line.type === 'user' ? (
              <span className="text-neon-green">user@aimy:~${`>`} {line.text}</span>
            ) : (
              <div className="flex">
                <span className="text-neon-pink mr-2">Aimy&gt;</span>
                <TypeAnimation
                  sequence={[line.text]}
                  wrapper="span"
                  cursor={false}
                  repeat={0}
                  speed={80}
                  style={{ display: 'inline-block' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terminal;

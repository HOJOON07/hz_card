import Alert from './components/shared/Alert';
import Button from './components/shared/Button';
import Input from './components/shared/Input';
import Text from './components/shared/Text';
import TextField from './components/shared/TextField';
import { useAlertContext } from './context/AlertContext';

function App() {
  const { open } = useAlertContext();

  return (
    <div>
      <Text typoghraphy="t1" color="blue" textAlign="center">
        하이
      </Text>
      <Button>안녕하세요 버튼입니다.</Button>
      <Button color="error" disabled>
        안녕하세요 버튼입니다.
      </Button>
      <Button color="error">안녕하세요 버튼입니다.</Button>
      <Button color="error" full={true}>
        안녕하세요 버튼입니다.
      </Button>
      <Button color="success" weak={true}>
        안녕하세요 버튼입니다.
      </Button>

      <Input aria-invalid={true} />
      <TextField label="아이디" />
      <TextField label="패스워드 " />
      {/* <Alert title="알럿이 떴다" onButtonClick={() => {}}></Alert> */}
      <Button
        onClick={() => {
          open({
            title: '테스트',
            description: '디스크립션',
            onButtonClick: () => {},
          });
        }}
      >
        AlerOpen
      </Button>
    </div>
  );
}

export default App;

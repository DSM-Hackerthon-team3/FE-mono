import styled from "@emotion/styled"
export const Button = () => {
  return (
    <div>
        <ButtonStyle><Text>프로필 수정</Text></ButtonStyle>
    </div>
  );
};

const ButtonStyle = styled.button`
    width: 100%;
    height: 42px;
    border-radius: 6px;
    background-color: #EFF1FF;
    border: 1px solid #6076FF;
    cursor: pointer;
`;
const Text = styled.p
`
font-size: 22px;
color: #4A5EDD;
`;

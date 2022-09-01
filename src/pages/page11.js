import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const baseURL = "https://res.cloudinary.com/sammy365/image";

  const getUserAvatar = async () => {
    const res = await fetch(`${baseURL}/list/user-avatars.json`);
    const data = await res.json();
    setUserInfo(data);
  };

  useEffect(() => {
    getUserAvatar();
  });

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Animal Farm contact list</TableCaption>
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userInfo &&
              userInfo.resources.map((info) => {
                const { format, public_id, version, type } = info;
                return (
                  <Tr key={version}>
                    <Td>
                      <Avatar
                        src={`${baseURL}/${type}/v${version}/${public_id}.${format}`}
                        alt="user-avatar"
                      />
                    </Td>
                    <Td>
                      <Text>{info.context.custom.username}</Text>
                    </Td>
                    <Td>
                      <Text>{info.context.custom.email}</Text>
                    </Td>
                    <Td>
                      <Text>{info.context.custom.phone}</Text>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;

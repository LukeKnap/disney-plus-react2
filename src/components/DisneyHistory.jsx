import styled from "styled-components";

const DisneyHistory = () => {
  return (
    <DisneyHistoryContainer>
      <DisneyHistoryHeader>
        <h2>Walt Disney's History</h2>
        <p>
          Walt Disney was an American animator, film producer, and entrepreneur.
          As a pioneer of the American animation industry, he introduced several
          developmental steps in the production of cartoons.
        </p>
      </DisneyHistoryHeader>
      <HistoryItemsContainer>
        <HistoryItem style={{ backgroundColor: "#FFC300" }}>
          <h2>1923</h2>
          <p>
            Walt Disney and his brother Roy founded Disney Brothers Studio[1].
          </p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#FF5733" }}>
          <h2>1928</h2>
          <p>Walt Disney created the character Mickey Mouse[1].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#C70039" }}>
          <h2>1955</h2>
          <p>Opening of Disneyland, the first theme park[1].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#900C3F" }}>
          <h2>1966</h2>
          <p>Death of Walt Disney[1].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#581845" }}>
          <h2>1971</h2>
          <p>Opening of Walt Disney World Resort in Florida[1].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#1A237E" }}>
          <h2>1986</h2>
          <p>
            Disney Brothers Studio changed its name to The Walt Disney
            Company[1].
          </p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#6A1B9A" }}>
          <h2>2001</h2>
          <p>Opening of the first Disney's California Adventure park[2].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#4527A0" }}>
          <h2>2006</h2>
          <p>Disney bought Pixar[2].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#283593" }}>
          <h2>2009</h2>
          <p>Disney bought Marvel Entertainment[2].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#1565C0" }}>
          <h2>2012</h2>
          <p>Disney bought Lucasfilm[2].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#0277BD" }}>
          <h2>2019</h2>
          <p>Disney+ launched, Disney's own streaming platform[1].</p>
        </HistoryItem>
        <HistoryItem style={{ backgroundColor: "#00838F" }}>
          <h2>2023</h2>
          <p>Disney celebrated its hundredth anniversary[1].</p>
        </HistoryItem>
      </HistoryItemsContainer>
      <DisneyHistoryHeader>
        <h2>The Walt Disney Studios</h2>
        <p>
          is an American production studio and a division of The Walt Disney
          Company. The studio, known for its film divisions, is one of the major
          Hollywood film studios. Its headquarters is the Walt Disney Studios
          complex in Burbank, California. The Walt Disney Studios film division
          is a member of the Motion Picture Association of America (MPAA). The
          studios collectively earned $618 million during the fiscal year 2011.
        </p>
      </DisneyHistoryHeader>
      <StyledImage src="./images/disneyland.jpg" alt="Disneyland" />
    </DisneyHistoryContainer>
  );
};

const DisneyHistoryContainer = styled.div`
  padding: 2rem;
  margin-top: 50px;
`;

const HistoryItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const HistoryItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: white;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  grid-column: span 6;
`;

const DisneyHistoryHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  color: #fff;
  padding: "0 30px";
`;

export default DisneyHistory;

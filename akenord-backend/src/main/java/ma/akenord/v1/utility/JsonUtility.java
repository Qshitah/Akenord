package ma.akenord.v1.utility;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtility {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String toJsonString(JsonNode jsonNode) throws JsonProcessingException {
        return objectMapper.writeValueAsString(jsonNode);
    }

    public static JsonNode fromJsonString(String jsonString) throws JsonProcessingException {
        return objectMapper.readTree(jsonString);
    }

}

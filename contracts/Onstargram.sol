pragma solidity 0.5.6;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Onstagram is ERC721, ERC721Enumerable {
    event PhotoUploaded(
        uint256 indexed tokenId,
        bytes photo,
        string title,
        string location,
        string description,
        uint256 timestamp
    );

    mapping(uint256 => PhotoData) private _photoList;

    struct PhotoData {
        uint256 tokenId;
        address[] ownerHistory;
        bytes photo;
        string title;
        string location;
        string description;
        uint256 timestamp;
    }

    function uploadPhoto(
        bytes memory photo,
        string memory title,
        string memory location,
        string memory description
    ) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory ownerHistory;

        PhotoData memory newPhotoData = PhotoData({
            tokenId: tokenId,
            ownerHistory: ownerHistory,
            photo: photo,
            title: title,
            location: location,
            description: description,
            timestamp: now
        });

        _photoList[tokenId] = newPhotoData;
        _photoList[tokenId].ownerHistory.push(msg.sender);

        emit PhotoUploaded(tokenId, photo, title, location, description, now);
    }

    function transferOwnership(uint256 tokenId, address to)
        public
        returns (
            uint256,
            address,
            address,
            address
        )
    {
        safeTransferFrom(msg.sender, to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        super.transferFrom(from, to, tokenId);
        _photoList[tokenId].ownerHistory.push(to);
    }

    function getTotalPhotoCount() public view returns (uint256) {
        return totalSupply();
    }

    function getPhoto(uint256 tokenId)
        public
        view
        returns (
            uint256,
            address[] memory,
            bytes memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        require(_photoList[tokenId].tokenId != 0, "Photo doesn't exist");
        return (
            _photoList[tokenId].tokenId,
            _photoList[tokenId].ownerHistory,
            _photoList[tokenId].photo,
            _photoList[tokenId].title,
            _photoList[tokenId].location,
            _photoList[tokenId].description,
            _photoList[tokenId].timestamp
        );
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { exception } from 'console';
import { VideosDataDto } from 'src/entities/dto/videos-data-dto';
import { VideosData } from 'src/entities/videos-data';

@Injectable()
export class VideosService{
    private readonly videoList:Map<String,VideosData> = new Map();
    create(video:VideosDataDto){
        
        let cmpData :VideosData = this.videoList.get(video.id.toString());
        let isValid = ( cmpData !== undefined );
        let isMatched = false;
        if(isValid){
          isMatched=(cmpData.id.toString() === video.id.toString() );
        }
        if(isMatched){
            throw new HttpException(`You can not insert a registry with this id:${video.id}`,
            HttpStatus.CONFLICT
            );
        }
        console.log(video);
        this.videoList.set(video.id.toString(),this.converter(video));
    }

    findAll():VideosDataDto[]{
        return Array.from(this.videoList.values());
    }

    findById(id:number):VideosDataDto{
        let data:VideosDataDto = this.videoList.get(id.toString());

        if(data === undefined){
            throw new HttpException(`Data not found with id> ${id}.`,HttpStatus.NOT_FOUND);
        }
        let dateNow:Date = new Date(Date.now());
        let dateExpiresAt = new Date(data.expires_at);
        let compl = this.converter(data);
        compl.watched = true;
        compl.expired = (dateExpiresAt > dateNow);
        this.update(data.id,compl);
       return data;
    }

    update(id:number,video:VideosDataDto){
        
        let data:VideosData=this.videoList.get(id.toString());
        if(data === undefined){
            throw new HttpException(`Data not found with id: ${id} to be edited.`,HttpStatus.NOT_FOUND);
        }
        
        let compl:VideosData = this.converter(video);
        compl.id = id;
        compl.watched = false;

        this.videoList.delete(id.toString());
        this.videoList.set(id.toString(),compl);
    }

    delete(id:number):boolean{
        return this.videoList.delete(id.toString());
     }

     private converter(dto:VideosDataDto){
        let result: VideosData=new VideosData();
        result.id = dto.id;
        result.name = dto.name;
        result.duration = dto.duration;
        result.provider = dto.provider;
        result.media_type = dto.provider_id;
        result.expires_at = dto.expires_at;
        console.log('result');console.log(result);
        return result;
    }
    private toDto(data:VideosData){
        let resutl: VideosDataDto;
        resutl.id = data.id;
        resutl.name = data.name;
        resutl.duration = data.duration;
        resutl.provider = data.provider;
        resutl.media_type = data.provider_id;
        resutl.expires_at = data.expires_at;
        return resutl;
    }
}